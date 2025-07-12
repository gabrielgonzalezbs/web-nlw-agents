import dayjs from "dayjs";
import ptBR from 'dayjs/locale/pt-br';
import relativeTime from "dayjs/plugin/relativeTime";

export function formatDateTime(dateTimeString:string) {
    dayjs.locale(ptBR);
    dayjs.extend(relativeTime);

    return dayjs(dateTimeString).toNow();
}