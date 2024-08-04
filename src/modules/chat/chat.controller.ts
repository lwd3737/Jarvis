import { Body, Controller, MessageEvent, Post, Sse } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PromptInputDto } from './chat.dto';
// import { Observable, map } from 'rxjs';
// import { CHAT_EVENT } from './chat.event';
import { Observable } from 'rxjs';
import { Public } from '../auth/auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('prompt')
  async prompt(@Body() promptDto: PromptInputDto): Promise<string> {
    await this.chatService.prompt(promptDto.toRecord());
    return 'ok';
  }

  @Public()
  @Sse('reply')
  reply(): Observable<MessageEvent> {
    return this.chatService.reply().pipe();
  }
}
