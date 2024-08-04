import { CoreUserMessage, UserContent } from 'ai';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Dto } from 'src/common/dto';
import { transformStringOrObject } from 'src/common/transformers/transform-object';
import { IsStringOrObject } from 'src/common/validators/is-string-or-object';

export class PromptInputDto extends Dto implements CoreUserMessage {
  @IsString({ message: ({ value }) => `${value} is not a valid role` })
  role: 'user';

  @IsStringOrObject()
  @Transform(({ value }) => transformStringOrObject(value))
  content: UserContent;

  toRecord() {
    return {
      role: this.role,
      content: this.content,
    };
  }
}
