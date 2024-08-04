import { createOpenAI } from '@ai-sdk/openai';
import { Injectable, MessageEvent } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config';
import {
  CoreMessage,
  CoreUserMessage,
  LanguageModel,
  streamText,
  StreamTextResult,
} from 'ai';
import { Observable } from 'rxjs';
import { CHAT_EVENT } from './chat.event';

@Injectable()
export class ChatService {
  private model: LanguageModel;
  private messages: CoreMessage[] = [];
  private stream: StreamTextResult<any>['fullStream'] | null = null;

  constructor(private configServie: ConfigService<Config, true>) {
    const openaiConfig = this.configServie.get('openai', { infer: true });
    const openai = createOpenAI({
      apiKey: openaiConfig.apiKey,
    });
    this.model = openai(openaiConfig.model);
  }

  public async prompt(message: CoreUserMessage): Promise<void> {
    this.messages.push(message);

    const result = await streamText({
      model: this.model,
      messages: this.messages,
    });

    this.stream = result.fullStream;
  }

  public reply(): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      if (!this.stream) throw new Error('No stream');

      let completedText = '';

      const reader = this.stream.getReader();
      reader.read().then(function processStream({ done, value }) {
        if (done) {
          subscriber.next({
            type: CHAT_EVENT.finish,
            data: {
              reason: 'completed',
            },
          });
          return;
        }

        // TODO: data 타입 정의
        // TODO: 공통 데이터 타입 공통 모듈에 정의
        switch (value.type) {
          case 'text-delta':
            subscriber.next({
              type: CHAT_EVENT.textChunk,
              data: value.textDelta,
            });
            completedText += value.textDelta;
            break;
          case 'finish':
            subscriber.next({
              type: CHAT_EVENT.finish,
              data: { reason: value.finishReason },
            });
            return;
          case 'error':
            console.error(value.error);

            subscriber.next({
              type: CHAT_EVENT.error,
              data: { error: value.error as string },
            });
            return;
        }

        reader.read().then(processStream);
      });

      this.messages.push({
        role: 'assistant',
        content: completedText,
      });

      return () => {
        this.stream = null;
      };
    });
  }

  public clearMessages() {
    this.messages = [];
  }
}
