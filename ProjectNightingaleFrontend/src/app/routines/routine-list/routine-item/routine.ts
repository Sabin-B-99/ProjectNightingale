import {Topic} from "../../routine-detail/topics/topic-list/topic-item/topic";

export class Routine{

  topics: Topic[] = [ new Topic('Test Topi 1'), new Topic('Test Topic 2')];
  constructor(public title: String) {
  }

}
