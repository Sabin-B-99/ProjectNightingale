import {Topic} from "../topic-model/topic";

export class Routine{
  constructor(public routineId: number = -1,
              public routineTitle: string,
              public routineDuration: number,
              private topics?: Topic[]) {
  }
  public getTopics(): Topic[]{
    if(!this.topics){
      return [];
    }
    return this.topics.slice();
  }

  public setTopics(topics: Topic[]):void{
    this.topics = topics;
  }
}
