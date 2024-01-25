function convertGregorianToHijri(date) {
    const gregorianParts = date.split('-');
    const yearInput = parseInt(gregorianParts[0]);
    const monthInput = parseInt(gregorianParts[1]);
    const dayInput = parseInt(gregorianParts[2]);

    const isValidDate = (year, month, day) => {
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        return year > 0 && month > 0 && month <= 12 && day > 0 && day <= lastDayOfMonth;
    };

    if (!isValidDate(yearInput, monthInput, dayInput)) {
        return console.error("Please enter a valid Gregorian date.");
    }

    const leapYear = yearInput % 4 === 0;

    const julianDay = Math.floor((1461 * (yearInput + 4800 + Math.floor((monthInput - 14) / 12))) / 4) +
                      Math.floor((367 * (monthInput - 2 - 12 * Math.floor((monthInput - 14) / 12))) / 12) -
                      Math.floor((3 * Math.floor((yearInput + 4900 + Math.floor((monthInput - 14) / 12)) / 100)) / 4) +
                      dayInput - 32075;

    const daysSinceHijriEpoch = julianDay - 1948439;
    const hijriYear = Math.floor((30 * daysSinceHijriEpoch + 10646) / 10631);
    const hijriMonth = Math.min(12, Math.ceil((daysSinceHijriEpoch - 29 - hijriYear * 10631) / 354));
    const hijriDay = daysSinceHijriEpoch - 29 - hijriYear * 10631 - hijriMonth * 354;

    // Use padStart to ensure two digits for month and day
    const formattedHijriMonth = hijriMonth.toString().padStart(2, '0');
    const formattedHijriDay = hijriDay.toString().padStart(2, '0');

    return `${hijriYear}-${formattedHijriMonth}-${formattedHijriDay}`;
}

const gregorianDate = '2024-01-25';
const hijriDate = convertGregorianToHijri(gregorianDate);

console.log(hijriDate);
