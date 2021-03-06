import { format } from "date-fns";
import esLocale from "date-fns/locale/es";

const DaysInMonth = (date2_UTC) => {
  var monthStart = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth(), 1);
  var monthEnd = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth() + 1, 1);
  var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
  return monthLength;
};

export const getAgeInYears = (date_1, date_2) => {
  //convert to UTC
  const date2_UTC = new Date(
    Date.UTC(date_2.getUTCFullYear(), date_2.getUTCMonth(), date_2.getUTCDate())
  );
  const date1_UTC = new Date(
    Date.UTC(date_1.getUTCFullYear(), date_1.getUTCMonth(), date_1.getUTCDate())
  );

  const years = date2_UTC.getFullYear() - date1_UTC.getFullYear();

  return years;
};

export const getAge = (date_1, date_2) => {
  //convert to UTC
  var date2_UTC = new Date(
    Date.UTC(date_2.getUTCFullYear(), date_2.getUTCMonth(), date_2.getUTCDate())
  );
  var date1_UTC = new Date(
    Date.UTC(date_1.getUTCFullYear(), date_1.getUTCMonth(), date_1.getUTCDate())
  );

  var yAppendix, mAppendix, dAppendix;

  //--------------------------------------------------------------
  var days = date2_UTC.getDate() - date1_UTC.getDate();
  if (days < 0) {
    date2_UTC.setMonth(date2_UTC.getMonth() - 1);
    days += DaysInMonth(date2_UTC);
  }
  //--------------------------------------------------------------
  var months = date2_UTC.getMonth() - date1_UTC.getMonth();
  if (months < 0) {
    date2_UTC.setFullYear(date2_UTC.getFullYear() - 1);
    months += 12;
  }
  //--------------------------------------------------------------
  var years = date2_UTC.getFullYear() - date1_UTC.getFullYear();

  if (years > 1) yAppendix = " años";
  else yAppendix = " año";
  if (months > 1) mAppendix = " meses";
  else mAppendix = " mes";
  if (days > 1) dAppendix = " dias";
  else dAppendix = " dia";

  return (
    years + yAppendix + ", " + months + mAppendix + " y " + days + dAppendix
  );
};

export const formatDate = (date) => {
  var date1_UTC = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)
  );
  let dateConvert = format(date1_UTC, "d 'de' MMMM 'del' yyyy", {
    locale: esLocale,
  });

  return dateConvert;
};
