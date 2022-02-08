export class TimeHelper {
    public static getSecondsBetween(startDate: Date, endDate: Date): number {
        let startMilliSeconds: number = startDate.valueOf();
        let endMilliSeconds: number = endDate.valueOf();

        let duration: number = (endMilliSeconds - startMilliSeconds) / 1000;
        return duration;
    }
}