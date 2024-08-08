import { ConflictError } from "../errors/typeErrors4xx";

class MxnDate {
  static now() {
    const nowInUTC = new Date();
    const nowInMexico = new Date(
      nowInUTC.toLocaleString("en-US", { timeZone: "America/Mexico_City" })
    );
    return nowInMexico;
  }
  static plusMinutes(minutes = 30) {
    const minuteInMs = 60000;
    const datePlusMinutes = new Date(
      this.now().getTime() + minutes * minuteInMs
    );
    return datePlusMinutes;
  }
  static plusDays(days = 7) {
    const dayInMs = 24 * 60 * 60000;
    const datePlusDays = new Date(this.now().getTime() + days * dayInMs);
    return datePlusDays;
  }
  static inMexico(nowInUTC) {
    const isNotDateType = !(nowInUTC instanceof Date);
    if (isNotDateType) throw new ConflictError("date is not Type Date");
    const nowInMexico = new Date(
      nowInUTC.toLocaleString("en-US", { timeZone: "America/Mexico_City" })
    );
    return nowInMexico;
  }
}

export { MxnDate };
