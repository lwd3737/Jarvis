import { CoreTool, TextStreamPart } from 'ai';

export type TextStreamChunk = TextStreamPart<
  Record<string, CoreTool<any, any>>
>;
