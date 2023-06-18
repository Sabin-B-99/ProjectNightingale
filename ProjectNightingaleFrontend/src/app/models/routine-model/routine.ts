import {Topic} from "../topic-model/topic";

export class Routine{
  constructor(public routineTitle: String,
              private topics?: Topic[]) {
  }
  public getTopics(): Topic[]{
    if(!this.topics){
      return [];
    }
    return this.topics.slice();
  }
}
