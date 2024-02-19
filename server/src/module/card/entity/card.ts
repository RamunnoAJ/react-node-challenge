export class Card {
  [x: string]: any
  constructor({
    id,
    userId,
    status,
    dateStart,
    dateEnd,
    comsuption,
    flag,
    country,
    plan,
  }: Card) {
    this.id = id
    this.userId = userId
    this.status = status
    this.dateStart = dateStart
    this.dateEnd = dateEnd
    this.comsuption = comsuption
    this.flag = flag
    this.country = country
    this.plan = plan
  }
}
