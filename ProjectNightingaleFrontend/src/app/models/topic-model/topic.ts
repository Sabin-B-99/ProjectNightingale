export class Topic{
  constructor(public topicTitle: string,
              public topicSongTitle?: string,
              public topicStrumPattern?: string,
              public topicTime?: string) {
  }

  public toString(): string{
    return this.topicSongTitle + ' ' + this.topicSongTitle;
  }
}
