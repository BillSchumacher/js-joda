import {
    ChronoField,
    ChronoUnit,
    Clock,
    DateTimeFormatter,
    DateTimeFormatterBuilder,
    DayOfWeek,
    Duration,
    Instant,
    IsoFields,
    LocalDate,
    LocalDateTime,
    LocalTime,
    Month,
    MonthDay,
    nativeJs,
    Period,
    ResolverStyle,
    SignStyle,
    Temporal,
    TemporalAdjuster,
    TemporalAdjusters,
    Year,
    YearMonth,
    ZoneOffset,
    ZoneOffsetTransition,
    ZoneRules,
    ZonedDateTime,
    ZoneId,
    DateTimeParseException,
    ZoneOffsetTransitionRule,
    TemporalQueries,
    TemporalUnit,
    ArithmeticException,
    IllegalArgumentException,
    IllegalStateException,
    NullPointerException,
    DateTimeException,
    UnsupportedTemporalTypeException,
    TemporalField,
    ValueRange,
    ZoneRegion,
    TextStyle
} from '../../'

// used below
declare function moment(): any;

/* - these test function don't actually *do* anything, they are also not meant to be run
 * - they are used to test the typescript definitions / typings that we provide
 * - they are mostly copied from the CheatSheet.md file and show usage of JSJoda and wether the usage complies
 *   with the typing definitions
 *
 *  We used the Contribution guide ideas from DefinitelyTyped for these "tests"
 *  For more information, see e.g. http:
 */

function test_ChronoUnit() {
    const cu = ChronoUnit.DAYS;

    expectType<LocalDate>(cu.addTo(LocalDate.now(), 1));
    expectType<number>(cu.between(LocalDate.now(), LocalDate.now()));
    expectType<Duration>(cu.duration());
    expectType<boolean>(cu.isDateBased());
    expectType<string>(cu.toString());
}

function test_LocalDate() {
    LocalDate.now();
    LocalDate.now(ZoneOffset.UTC);
    LocalDate.parse('2016-02-23');
    LocalDate.of(2016, 2, 23);
    LocalDate.of(2016, Month.FEBRUARY, 23);
    LocalDate.ofEpochDay(-1);
    LocalDate.ofYearDay(2016, 42);

    let d = LocalDate.parse('2016-12-24');

    d.dayOfMonth();
    d.month();
    d.monthValue();
    d.year();
    d.dayOfWeek();
    d.dayOfWeek().value();
    d.dayOfYear();
    d.isLeapYear();
    d.plusYears(1).isLeapYear();
    d.toEpochDay();
    d.lengthOfMonth();
    d.lengthOfYear();
    d.isoWeekOfWeekyear();
    d.isoWeekyear();

    expectType<string>(d.toString());
    expectType<string>(d.toJSON());

    LocalDate.of(2017, 1, 1).isoWeekOfWeekyear();
    LocalDate.of(2017, 1, 1).isoWeekyear();
    d.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 52);
    d.get(IsoFields.QUARTER_OF_YEAR);
    d.get(IsoFields.DAY_OF_QUARTER);
    d.with(IsoFields.QUARTER_OF_YEAR, 3).with(IsoFields.DAY_OF_QUARTER, 15);

    expectType<boolean>(d.isSupported(ChronoField.DAY_OF_MONTH));
    expectType<boolean>(d.isSupported(ChronoUnit.DAYS));

    d = LocalDate.parse('2016-02-23');
    expectType<LocalDate>(d.plusDays(366));
    expectType<LocalDate>(d.minusDays(366));
    expectType<LocalDate>(d.plusMonths(12));
    expectType<LocalDate>(d.minusMonths(12));
    expectType<LocalDate>(d.plusWeeks(4));
    expectType<LocalDate>(d.minusWeeks(4));
    expectType<LocalDate>(d.plusYears(1));
    expectType<LocalDate>(d.minusYears(1));
    expectType<LocalDate>(d.plus(3, ChronoUnit.DECADES));
    expectType<LocalDate>(d.minus(3, ChronoUnit.DECADES));
    expectType<LocalDate>(d.plus(Period.ofMonths(3).plusDays(3)));
    expectType<LocalDate>(d.minus(Period.ofMonths(3).plusDays(3)));

    d = LocalDate.parse('2016-12-24');
    expectType<LocalDate>(d.withDayOfMonth(1));
    expectType<LocalDate>(d.withMonth(1).withDayOfMonth(1));
    expectType<LocalDate>(d.withMonth(Month.NOVEMBER).withDayOfMonth(1));
    expectType<LocalDate>(d.withYear(1));
    expectType<LocalDate>(d.withDayOfYear(42));
    expectType<LocalDate>(d.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 52));
    LocalDate.now().plusMonths(1).withDayOfMonth(1).minusDays(1);

    let d1 = LocalDate.parse('2016-12-24');
    let d2 = d1.plusDays(2);

    d1.isAfter(d2);
    d1.isBefore(d2);

    d1.equals(d2);
    d1.equals(d1.plusDays(0));
    d1.equals(d1.plusDays(1));

    d1.compareTo(d1) === 0;
    d1.compareTo(d2) < 0;
    d2.compareTo(d1) > 0;

    d1.hashCode();
    d2.hashCode();
    d1.hashCode() !== d2.hashCode();

    d1 = LocalDate.parse('2016-12-24');
    d2 = d1.plusMonths(13).plusDays(42);
    d1.until(d2).toString();
    d1.until(d2).toTotalMonths();
    d1.until(d2, ChronoUnit.MONTHS);
    d1.until(d2, ChronoUnit.DAYS);

    LocalDate.from(LocalDateTime.now());
    LocalDateTime.now().toLocalDate();

    d1 = LocalDate.parse('2016-02-25');
    d1.atStartOfDay();
    d1.atTime(LocalTime.of(11, 55));
    d1.atTime(LocalTime.NOON);
    d = LocalDate.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
    d = LocalDate.from(nativeJs(new Date()));
    d = LocalDate.from(nativeJs(moment()));

    d = LocalDate.parse('2016-12-24');
    expectType<LocalDate>(d.with(TemporalAdjusters.firstDayOfMonth()));
    expectType<LocalDate>(d.with(TemporalAdjusters.lastDayOfMonth()));
    expectType<LocalDate>(d.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)));
    expectType<LocalDate>(d.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY)));
    expectType<LocalDate>(d.with(TemporalAdjusters.next(DayOfWeek.SATURDAY)));
    expectType<LocalDate>(d.with(TemporalAdjusters.lastInMonth(DayOfWeek.SATURDAY)));
    expectType<LocalDate>(d.with(TemporalAdjusters.firstInMonth(DayOfWeek.SATURDAY)));

    expectType<LocalDate | null>(d1.query(LocalDate.FROM));
    expectType<LocalTime | null>(d1.query(TemporalQueries.localTime()));
}

function test_Instant() {
    let i = Instant.parse('2019-03-24T23:32:46.488Z');

    i.toString();
    i.toJSON();

    expectType<number>(i.get(ChronoField.INSTANT_SECONDS));
    expectType<boolean>(i.isSupported(ChronoField.INSTANT_SECONDS));
    expectType<boolean>(i.isSupported(ChronoUnit.SECONDS));
    expectType<ValueRange>(i.range(ChronoField.MICRO_OF_SECOND));
    expectType<Instant>(i.minus(5, ChronoUnit.DAYS));
    expectType<Instant>(i.plus(5, ChronoUnit.DAYS));
    expectType<Instant>(i.minus(Duration.ofHours(3)));
    expectType<Instant>(i.plus(Duration.ofHours(3)));
    expectType<Instant>(i.with(Instant.EPOCH));
    expectType<Instant>(i.with(IsoFields.DAY_OF_QUARTER, 10));
    expectType<number>(i.until(Instant.now(), ChronoUnit.SECONDS));

    expectType<Instant | null>(i.query(Instant.FROM));
    expectType<LocalDate | null>(i.query(TemporalQueries.localDate()));
}

function test_LocalTime() {
    LocalTime.now();
    LocalTime.now(ZoneOffset.UTC);
    LocalTime.parse('09:42');
    LocalTime.parse('09:42:42');
    LocalTime.parse('09:42:42.123');
    LocalTime.parse('09:42:42.123456789');
    LocalTime.of(23, 55);
    LocalTime.of(23, 55, 42);
    LocalTime.of(23, 55, 42, 123000000);
    LocalTime.ofSecondOfDay(3666);

    let t = LocalTime.parse('23:55:42.123');

    t.hour();
    t.minute();
    t.second();
    t.nano();

    expectType<string>(t.toString());
    expectType<string>(t.toJSON());

    t = LocalTime.parse('11:55:42');
    expectType<LocalTime>(t.plusHours(12));
    expectType<LocalTime>(t.minusHours(12));
    expectType<LocalTime>(t.plusMinutes(30));
    expectType<LocalTime>(t.minusMinutes(30));
    expectType<LocalTime>(t.plusSeconds(30));
    expectType<LocalTime>(t.minusSeconds(30));
    expectType<LocalTime>(t.plusNanos(1000000));
    expectType<LocalTime>(t.minusNanos(1000000));

    expectType<number>(t.get(ChronoField.MINUTE_OF_DAY));
    expectType<number>(t.get(IsoFields.DAY_OF_QUARTER));
    expectType<boolean>(t.isSupported(ChronoField.HOUR_OF_DAY));
    expectType<boolean>(t.isSupported(ChronoUnit.SECONDS));
    expectType<ValueRange>(t.range(ChronoField.MICRO_OF_SECOND));
    expectType<LocalTime>(t.minus(5, ChronoUnit.DAYS));
    expectType<LocalTime>(t.plus(5, ChronoUnit.DAYS));
    expectType<LocalTime>(t.minus(Duration.ofHours(3)));
    expectType<LocalTime>(t.plus(Duration.ofHours(3)));
    expectType<LocalTime>(t.with(LocalTime.MIDNIGHT));
    expectType<LocalTime>(t.with(IsoFields.DAY_OF_QUARTER, 10));
    expectType<number>(t.until(LocalTime.now(), ChronoUnit.SECONDS));

    t = LocalTime.parse('11:55:42');
    t.withHour(1);
    t.withMinute(1);
    t.withSecond(1);
    t.with(ChronoField.MILLI_OF_SECOND, 51);
    let nextEvenSecond = {
        adjustInto: function (t: LocalTime) {
            return t.second() % 2 === 0 ? t.plusSeconds(2) : t.plusSeconds(1);
        }
    };
    t.with(nextEvenSecond);
    t.plusSeconds(1).with(nextEvenSecond);

    t = LocalTime.parse('23:55:42.123');

    t.truncatedTo(ChronoUnit.SECONDS);
    t.truncatedTo(ChronoUnit.MINUTES);
    t.truncatedTo(ChronoUnit.HOURS);
    t.truncatedTo(ChronoUnit.HALF_DAYS);
    t.truncatedTo(ChronoUnit.DAYS);

    let t1 = LocalTime.parse('11:55:42');
    let t2 = t1.plusHours(2);

    t1.isAfter(t2);
    t1.isBefore(t2);

    t1.equals(t1.plusHours(0));
    t1.equals(t1.plusHours(1));

    t1.compareTo(t1) === 0;
    t1.compareTo(t2) < 0;
    t2.compareTo(t1) > 0;

    t1.hashCode();
    t2.hashCode();
    t1.hashCode() !== t2.hashCode();

    t1 = LocalTime.parse('11:00');
    t2 = t1.plusHours(2).plusMinutes(42).plusSeconds(12);
    t1.until(t2, ChronoUnit.HOURS);
    t1.until(t2, ChronoUnit.MINUTES);
    t1.until(t2, ChronoUnit.SECONDS);

    t = LocalTime.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
    t = LocalTime.from(nativeJs(new Date()));
    t = LocalTime.from(nativeJs(moment()));

    expectType<LocalTime | null>(t1.query(LocalTime.FROM));
    expectType<LocalDate | null>(t1.query(TemporalQueries.localDate()));
}

function test_LocalDateTime() {
    LocalDateTime.now();
    LocalDateTime.now(ZoneOffset.UTC);
    LocalDateTime.parse('2016-02-26T09:42');
    LocalDateTime.parse('2016-02-26T09:42:42.123');

    LocalDateTime.of(2016, 2, 29);
    LocalDateTime.of(2016, 2, 29, 12, 55, 42);
    LocalDateTime.of(2016, 2, 29, 12, 55, 42, 9);

    LocalDateTime.ofEpochSecond(0, ZoneOffset.UTC);
    LocalDateTime.ofInstant(Instant.now());
    LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC);

    let dt: LocalDateTime = LocalDateTime.parse('2016-02-26T23:55:42.123');

    dt.year();
    dt.month();
    dt.monthValue();
    dt.dayOfMonth();
    dt.hour();
    dt.minute();
    dt.second();
    dt.nano();

    dt.dayOfWeek();
    dt.dayOfWeek().value();
    dt.dayOfYear();
    dt.toLocalDate().isLeapYear();

    dt.toLocalDate();
    dt.toLocalTime();
    dt.toLocalDate().lengthOfMonth();
    dt.toLocalDate().lengthOfYear();
    dt.toLocalDate().isoWeekOfWeekyear();

    expectType<string>(dt.toString());
    expectType<string>(dt.toJSON());

    expectType<number>(dt.get(ChronoField.HOUR_OF_DAY));
    expectType<number>(dt.get(IsoFields.DAY_OF_QUARTER));
    expectType<boolean>(dt.isSupported(ChronoField.HOUR_OF_DAY));
    expectType<boolean>(dt.isSupported(ChronoUnit.SECONDS));
    expectType<ValueRange>(dt.range(ChronoField.MICRO_OF_SECOND));
    expectType<LocalDateTime>(dt.minus(5, ChronoUnit.DAYS));
    expectType<LocalDateTime>(dt.plus(5, ChronoUnit.DAYS));
    expectType<LocalDateTime>(dt.minus(Duration.ofHours(3)));
    expectType<LocalDateTime>(dt.plus(Duration.ofHours(3)));
    expectType<LocalDateTime>(dt.with(LocalDateTime.MAX));
    expectType<LocalDateTime>(dt.with(IsoFields.DAY_OF_QUARTER, 10));
    expectType<number>(dt.until(LocalDateTime.now(), ChronoUnit.SECONDS));

    dt = LocalDateTime.parse('2016-02-26T23:55:42.123');
    dt.plusDays(366);
    dt.minusDays(366);

    dt.plusMonths(12);
    dt.minusMonths(12);

    dt.plusWeeks(4);
    dt.minusWeeks(4);

    dt.plusYears(1);
    dt.minusYears(1);

    dt.plus(3, ChronoUnit.DECADES);
    dt.minus(3, ChronoUnit.DECADES);

    dt.plus(Period.ofMonths(3).plusDays(3));
    dt.minus(Period.ofMonths(3).plusDays(3));

    dt.plusHours(12);
    dt.minusHours(12);

    dt.plusMinutes(30);
    dt.minusMinutes(30);

    dt.plusSeconds(30);
    dt.minusSeconds(30);

    dt.plusNanos(1000000);
    dt.minusNanos(1000000);

    dt.plus(Duration.ofHours(30).plusMinutes(45));
    dt.minus(Duration.ofHours(30).plusMinutes(45));

    dt = LocalDateTime.parse('2016-02-26T23:55:42.123');
    dt.withHour(1);

    dt.withMinute(1);

    dt.withSecond(1);

    dt.withNano(0);

    dt.with(ChronoField.MILLI_OF_SECOND, 51);


    var nextEvenSecond = {
        adjustInto: function (t: LocalDateTime) {
            return t.second() % 2 === 0 ? t.plusSeconds(2) : t.plusSeconds(1);
        }
    };
    dt.with(nextEvenSecond);
    dt.plusSeconds(1).with(nextEvenSecond);

    dt = LocalDateTime.parse('2016-02-26T23:55:42.123');

    dt.truncatedTo(ChronoUnit.SECONDS);
    dt.truncatedTo(ChronoUnit.MINUTES);
    dt.truncatedTo(ChronoUnit.HOURS);
    dt.truncatedTo(ChronoUnit.HALF_DAYS);
    dt.truncatedTo(ChronoUnit.DAYS);

    var dt1 = LocalDateTime.parse('2016-02-26T23:55:42.123');
    var dt2 = dt1.plusHours(2);

    dt1.isAfter(dt2);
    dt1.isBefore(dt2);

    dt1.equals(dt1.plusHours(0));
    dt1.equals(dt1.plusHours(1));

    dt1.compareTo(dt1) === 0;
    dt1.compareTo(dt2) < 0;
    dt2.compareTo(dt1) > 0;

    dt1.hashCode();
    dt2.hashCode();
    dt1.hashCode() !== dt2.hashCode();

    dt1 = LocalDateTime.parse('2016-02-26T23:55:42.123');
    dt2 = dt1.plusYears(6).plusMonths(12).plusHours(2).plusMinutes(42).plusSeconds(12);
    dt1.until(dt2, ChronoUnit.YEARS);
    dt1.until(dt2, ChronoUnit.MONTHS);
    dt1.until(dt2, ChronoUnit.WEEKS);
    dt1.until(dt2, ChronoUnit.DAYS);
    dt1.until(dt2, ChronoUnit.HOURS);
    dt1.until(dt2, ChronoUnit.MINUTES);
    dt1.until(dt2, ChronoUnit.SECONDS);

    dt = LocalDateTime.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
    dt = LocalDateTime.from(nativeJs(new Date()));
    dt = LocalDateTime.from(nativeJs(moment()));

    expectType<LocalDateTime | null>(dt.query(LocalDateTime.FROM));
    expectType<LocalDate | null>(dt.query(TemporalQueries.localDate()));
}

function test_ZonedDateTime() {
    ZonedDateTime.now().toString();

    ZonedDateTime.now().withFixedOffsetZone().toString();
    ZonedDateTime.now().toString();

    ZonedDateTime.now(ZoneOffset.UTC).toString();

    ZonedDateTime.now(ZoneId.of('UTC-05:00')).toString();

    ZonedDateTime.parse('2016-03-18T12:38:23.561+01:00[SYSTEM]');
    ZonedDateTime.parse('2016-03-18T12:38:23.561+01:00');
    ZonedDateTime.parse('2016-03-18T11:38:23.561Z');
    ZonedDateTime.parse('2016-03-18T06:38:23.561-05:00[UTC-05:00]');
    LocalDate.parse('2012-06-06').atStartOfDay().atZone(ZoneId.SYSTEM);
    ZonedDateTime.of(LocalDateTime.parse('2012-06-06T00:00'), ZoneId.SYSTEM);
    ZonedDateTime.of(LocalDate.parse('2012-06-06'), LocalTime.MIDNIGHT, ZoneId.SYSTEM);

    ZonedDateTime.ofInstant(Instant.now(), ZoneId.SYSTEM);

    ZonedDateTime.ofLocal(LocalDateTime.now(), ZoneId.SYSTEM, null)
    ZonedDateTime.ofLocal(LocalDateTime.now(), ZoneId.UTC, ZoneOffset.UTC)

    var zdt = LocalDate.of(2016, 3, 18)
        .atTime(LocalTime.NOON)
        .atZone(ZoneId.of("UTC-05:00"));

    zdt.withZoneSameLocal(ZoneId.UTC);
    zdt.withZoneSameInstant(ZoneId.UTC);

    zdt.plusWeeks(2);
    zdt.plusHours(2 * 7 * 24);

    expectType<number>(zdt.get(ChronoField.YEAR));
    expectType<number>(zdt.get(IsoFields.DAY_OF_QUARTER));
    expectType<boolean>(zdt.isSupported(ChronoField.YEAR));
    expectType<boolean>(zdt.isSupported(ChronoUnit.SECONDS));
    expectType<ValueRange>(zdt.range(ChronoField.MICRO_OF_SECOND));
    expectType<ZonedDateTime>(zdt.minus(5, ChronoUnit.DAYS));
    expectType<ZonedDateTime>(zdt.plus(5, ChronoUnit.DAYS));
    expectType<ZonedDateTime>(zdt.minus(Duration.ofHours(3)));
    expectType<ZonedDateTime>(zdt.plus(Duration.ofHours(3)));
    expectType<ZonedDateTime>(zdt.with(TemporalAdjusters.firstDayOfMonth()));
    expectType<ZonedDateTime>(zdt.with(IsoFields.DAY_OF_QUARTER, 10));
    expectType<number>(zdt.until(ZonedDateTime.now(), ChronoUnit.SECONDS));

    expectType<ZonedDateTime>(zdt.withEarlierOffsetAtOverlap());
    expectType<ZonedDateTime>(zdt.withLaterOffsetAtOverlap());

    expectType<ZonedDateTime | null>(zdt.query(ZonedDateTime.FROM));
    expectType<LocalDate | null>(zdt.query(TemporalQueries.localDate()));

    expectType<string>(zdt.toString());
    expectType<string>(zdt.toJSON());
}

function test_ZoneOffsetTransition() {
    const zot = ZoneOffsetTransition.of(LocalDateTime.now(), ZoneOffset.UTC, ZoneOffset.ofHours(2));

    expectType<Instant>(zot.instant());
    expectType<number>(zot.toEpochSecond());;
    expectType<LocalDateTime>(zot.dateTimeAfter());
    expectType<LocalDateTime>(zot.dateTimeBefore());
    expectType<ZoneOffset>(zot.offsetAfter());
    expectType<ZoneOffset>(zot.offsetBefore());
    expectType<Duration>(zot.duration());
    expectType<number>(zot.durationSeconds());
    expectType<boolean>(zot.isGap());
    expectType<boolean>(zot.isOverlap());
    expectType<boolean>(zot.isValidOffset(ZoneOffset.UTC));
    expectType<ZoneOffset[]>(zot.validOffsets());
    expectType<boolean>(zot.equals(zot));
    expectType<number>(zot.compareTo(undefined! as ZoneOffsetTransition));
    expectType<number>(zot.hashCode());
    expectType<string>(zot.toString());
}

function test_ZoneRules() {
    const zr = ZoneRules.of(ZoneOffset.UTC);

    expectType<boolean>(zr.isFixedOffset());
    expectType<ZoneOffset>(zr.offset(Instant.now()));
    expectType<ZoneOffset>(zr.offset(LocalDateTime.now()));
    expectType<string>(zr.toJSON());
    expectType<ZoneOffset>(zr.offsetOfEpochMilli(0));
    expectType<ZoneOffset>(zr.offsetOfInstant(Instant.now()));
    expectType<ZoneOffset>(zr.offsetOfLocalDateTime(LocalDateTime.now()));
    expectType<ZoneOffset[]>(zr.validOffsets(LocalDateTime.now()));
    expectType<ZoneOffsetTransition>(zr.transition(LocalDateTime.now()));
    expectType<ZoneOffset>(zr.standardOffset(Instant.now()));
    expectType<Duration>(zr.daylightSavings(Instant.now()));
    expectType<boolean>(zr.isDaylightSavings(Instant.now()));
    expectType<boolean>(zr.isValidOffset(LocalDateTime.now(), ZoneOffset.UTC));
    expectType<ZoneOffsetTransition>(zr.nextTransition(Instant.now()));
    expectType<ZoneOffsetTransition>(zr.previousTransition(Instant.now()));
    expectType<ZoneOffsetTransition[]>(zr.transitions());
    expectType<ZoneOffsetTransitionRule[]>(zr.transitionRules());
    expectType<string>(zr.toString());
}

function test_Period() {

    Period.parse('P1Y10M').toString();

    Period.of(10, 5, 30).toString();

    Period.ofYears(10).toString();

    Period.ofYears(10).plusDays(45).toString();

    Period.of(1, 37, 0).normalized().toString();

    Period.ofYears(10).plusMonths(10).minusDays(42).toString();

    var p = Period.ofMonths(1);
    LocalDate.parse('2012-12-12').plus(p);
    LocalDate.parse('2012-01-31').plus(p);
    LocalDateTime.parse('2012-05-31T12:00').plus(p);

    expectType<string>(p.toString());
    expectType<string>(p.toJSON());

    Period.between(LocalDate.parse('2012-06-30'), LocalDate.parse('2012-08-31'));
}

function test_Duration() {
    Duration.ofSeconds(32).toString();
    Duration.ofSeconds(32, 500000000).toString();

    Duration.ofHours(10).toString();

    Duration.ofDays(10).toString();

    var dt = LocalDateTime.parse('2012-12-24T12:00');

    dt.plus(Duration.ofHours(10).plusMinutes(30)).toString();
    dt.minus(Duration.ofHours(12).multipliedBy(10)).toString();

    var dt1 = LocalDateTime.parse('2012-12-24T12:00');

    Duration.between(dt1, dt1.plusHours(10)).toString();

    const dur = Duration.ofSeconds(1);
    expectType<Duration>(dur.minus(Duration.ofNanos(1)));
    expectType<Duration>(dur.minus(1, ChronoUnit.NANOS));
    expectType<Duration>(dur.plus(Duration.ofNanos(1)));
    expectType<Duration>(dur.plus(1, ChronoUnit.NANOS));
}

function test_Year() {
    const year = Year.now();

    expectType<number>(year.get(ChronoField.INSTANT_SECONDS));
    expectType<boolean>(year.isSupported(ChronoField.INSTANT_SECONDS));
    expectType<boolean>(year.isSupported(ChronoUnit.SECONDS));
    expectType<ValueRange>(year.range(ChronoField.MICRO_OF_SECOND));
    expectType<Year>(year.minus(5, ChronoUnit.DAYS));
    expectType<Year>(year.plus(5, ChronoUnit.DAYS));
    expectType<Year>(year.minus(Duration.ofHours(3)));
    expectType<Year>(year.plus(Duration.ofHours(3)));
    expectType<Year>(year.with(YearMonth.now()));
    expectType<Year>(year.with(IsoFields.DAY_OF_QUARTER, 10));
    expectType<number>(year.until(Year.now(), ChronoUnit.SECONDS));

    expectType<string>(year.toString());
    expectType<string>(year.toJSON());

    expectType<LocalDate>(year.atDay(2));
    expectType<YearMonth>(year.atMonth(5));
    expectType<YearMonth>(year.atMonth(Month.DECEMBER));
    expectType<LocalDate>(year.atMonthDay(MonthDay.of(6, 22)));

    expectType<boolean>(year.isAfter(Year.of(2020)));
    expectType<boolean>(year.isBefore(Year.of(2020)));
    expectType<boolean>(year.isLeap());
    expectType<boolean>(year.isValidMonthDay(MonthDay.of(2, 29)));
    expectType<number>(year.compareTo(Year.of(2020)));

    expectType<number>(year.length());

    year.plus(Period.ofYears(2));
    year.plus(1, ChronoUnit.YEARS);
    year.plusYears(3);
    year.minus(Period.ofYears(2));
    year.minus(1, ChronoUnit.YEARS);
    year.minusYears(3);

    year.with(ChronoField.YEAR, 2015);

    expectType<Year | null>(year.query(Year.FROM));
    expectType<LocalDate | null>(year.query(TemporalQueries.localDate()));
}

function test_YearMonth() {
    YearMonth.from(YearMonth.now());
    YearMonth.from(LocalDate.now());

    YearMonth.now();
    YearMonth.now(ZoneId.systemDefault());
    YearMonth.now(Clock.systemUTC());

    YearMonth.of(2017, 10);
    YearMonth.of(2017, Month.of(10));

    YearMonth.parse('2017-10');
    YearMonth.parse('2017-10', DateTimeFormatter.ofPattern('yyyy-MM'));

    var duration = Duration.of(10, ChronoUnit.MONTHS);
    var ym = YearMonth.of(2017, 10);

    ym.minusYears(10);
    ym.minusMonths(10);

    ym.plusYears(10);
    ym.plusMonths(10);

    ym.withYear(2018);
    ym.withMonth(11);

    ym.isSupported(ChronoField.YEAR);
    ym.isSupported(ChronoUnit.YEARS);

    expectType<number>(ym.get(ChronoField.INSTANT_SECONDS));
    expectType<boolean>(ym.isSupported(ChronoField.INSTANT_SECONDS));
    expectType<boolean>(ym.isSupported(ChronoUnit.SECONDS));
    expectType<ValueRange>(ym.range(ChronoField.MICRO_OF_SECOND));
    expectType<YearMonth>(ym.minus(5, ChronoUnit.DAYS));
    expectType<YearMonth>(ym.plus(5, ChronoUnit.DAYS));
    expectType<YearMonth>(ym.minus(Duration.ofHours(3)));
    expectType<YearMonth>(ym.plus(Duration.ofHours(3)));
    expectType<YearMonth>(ym.with(Year.now()));
    expectType<YearMonth>(ym.with(IsoFields.DAY_OF_QUARTER, 10));
    expectType<number>(ym.until(YearMonth.now(), ChronoUnit.SECONDS));

    ym.year();
    ym.monthValue();
    ym.month();
    ym.isLeapYear();
    ym.isValidDay();
    ym.lengthOfMonth();
    ym.lengthOfYear();
    ym.atDay(10);
    ym.atEndOfMonth();
    ym.compareTo(YearMonth.of(2017, 20));
    ym.isAfter(YearMonth.of(2017, 20));
    ym.isBefore(YearMonth.of(2017, 20));
    ym.equals(YearMonth.of(2017, 20));

    expectType<string>(ym.toString());
    expectType<string>(ym.toJSON());

    ym.format(DateTimeFormatter.ofPattern('yyyy-MM'));

    expectType<YearMonth | null>(ym.query(YearMonth.FROM));
    expectType<LocalDate | null>(ym.query(TemporalQueries.localDate()));
}

function test_DateTimeFormatter() {
    ZonedDateTime.parse('2017-01-01T00:00:00+0200[Europe/Amsterdam]', DateTimeFormatter.ISO_ZONED_DATE_TIME);

    ZonedDateTime.parse('2017-01-01T00:00:00+0200', DateTimeFormatter.ISO_OFFSET_DATE_TIME);

    ZonedDateTime.parse('2017-01-01T00:00:00.12345678', DateTimeFormatter.ISO_INSTANT);
}

function test_DateTimeFormatterBuilder() {
    const formatter1: DateTimeFormatter = new DateTimeFormatterBuilder()
        .parseCaseInsensitive()
        .appendPattern('d')
        .appendLiteral('/')
        .appendPattern('M')
        .appendLiteral('/')
        .appendValueReduced(ChronoField.YEAR, 2, 4, LocalDate.now().year())
        .toFormatter(ResolverStyle.SMART);
    const formatter2: DateTimeFormatter = new DateTimeFormatterBuilder()
        .parseCaseInsensitive()
        .appendPattern('d')
        .optionalStart()
        .optionalStart()
        .appendLiteral('-')
        .optionalEnd()
        .optionalStart()
        .appendLiteral(' ')
        .optionalEnd()
        .optionalEnd()
        .appendPattern('MMM')
        .optionalStart()
        .optionalStart()
        .appendLiteral('-')
        .optionalEnd()
        .optionalStart()
        .appendLiteral(' ')
        .optionalEnd()
        .optionalEnd()
        .appendValueReduced(ChronoField.YEAR, 2, 4, LocalDate.now().year())
        .toFormatter(ResolverStyle.SMART);
    const formatter3: DateTimeFormatter = new DateTimeFormatterBuilder()
        .append(DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss'))
        .appendLiteral('.')
        .appendValue(ChronoField.MICRO_OF_SECOND, 1, 6, SignStyle.NOT_NEGATIVE)
        .toFormatter(ResolverStyle.STRICT);
    const formatter4: DateTimeFormatter = new DateTimeFormatterBuilder()
        .appendPattern("yyyy-MM-dd HH:mm:ss")
        .appendFraction(ChronoField.MICRO_OF_SECOND, 0, 6, true)
        .toFormatter(ResolverStyle.LENIENT);
    const formatter5: DateTimeFormatter = new DateTimeFormatterBuilder()
        .appendPattern("yyyy-MM-dd HH:mm:ss")
        .toFormatter();
}

function test_ZoneId() {
    var zoneId = ZoneId.SYSTEM;

    zoneId.id();

    expectType<string>(zoneId.toString());
    expectType<string>(zoneId.toJSON());
}

function test_ZoneOffset() {
    var zoff = ZoneOffset.UTC;

    zoff.id();

    expectType<string>(zoff.toString());
    expectType<string>(zoff.toJSON());
}

function test_ZoneRegion() {
    var zreg = ZoneRegion.UTC;

    zreg.id();

    expectType<string>(zreg.toString());
    expectType<string>(zreg.toJSON());
}

function test_DayOfWeek() {
    const dow = DayOfWeek.SUNDAY;
    expectType<number>(dow.get(ChronoField.MONTH_OF_YEAR));
    expectType<boolean>(dow.isSupported(ChronoField.MONTH_OF_YEAR));
    expectType<ValueRange>(dow.range(ChronoField.MONTH_OF_YEAR));

    expectType<number>(DayOfWeek.MONDAY.compareTo(DayOfWeek.WEDNESDAY));
    
    expectType<string>(DayOfWeek.WEDNESDAY.toString());
    expectType<string>(DayOfWeek.WEDNESDAY.toJSON());
}

function test_Month() {
    expectType<number>(Month.JANUARY.ordinal());
    expectType<string>(Month.MARCH.name());
    expectType<number>(Month.SEPTEMBER.compareTo(Month.DECEMBER));
    expectType<boolean>(Month.OCTOBER.equals(Month.NOVEMBER));

    expectType<string>(Month.JUNE.toString());
    expectType<string>(Month.JUNE.toJSON());

    const m = Month.DECEMBER;
    expectType<number>(m.get(ChronoField.MONTH_OF_YEAR));
    expectType<boolean>(m.isSupported(ChronoField.MONTH_OF_YEAR));
    expectType<ValueRange>(m.range(ChronoField.MONTH_OF_YEAR));

    expectType<Month>(Month.valueOf('FEBRUARY'));
    expectType<LocalDate | null>(m.query(TemporalQueries.localDate()));
}

function test_MonthDay() {
    const md = MonthDay.now();

    expectType<number>(md.get(ChronoField.MONTH_OF_YEAR));
    expectType<number>(md.get(IsoFields.QUARTER_OF_YEAR));
    expectType<boolean>(md.isSupported(ChronoField.MONTH_OF_YEAR));
    expectType<ValueRange>(md.range(ChronoField.MONTH_OF_YEAR));

    expectType<string>(md.toString());
    expectType<string>(md.toJSON());

    expectType<MonthDay | null>(md.query(MonthDay.FROM));
    expectType<LocalDate | null>(md.query(TemporalQueries.localDate()));
}

function test_Clock() {
    const clock = Clock.systemUTC();
    const fixed = Clock.fixed(Instant.now(), ZoneId.UTC);
    const offset = Clock.offset(clock, Duration.ofHours(1));

    expectType<ZoneId>(clock.zone());
    expectType<Clock>(clock.withZone(ZoneId.UTC));
    expectType<Clock>(fixed);
    expectType<Clock>(offset);
}

function test_Temporal() {
    const temporal: Temporal = Year.now();

    temporal.isSupported(ChronoUnit.YEARS);

    temporal.minus(4, ChronoUnit.YEARS);
    temporal.minus(Period.ofYears(4));

    temporal.plus(4, ChronoUnit.YEARS);
    temporal.plus(Period.ofYears(4));

    temporal.until(Year.of(2020), ChronoUnit.YEARS);

    const nextYear: TemporalAdjuster = {
        adjustInto(temporal: Temporal): Temporal {
            if (temporal.isSupported(ChronoUnit.YEARS)) {
                return temporal.plus(1, ChronoUnit.YEARS);
            }
            throw new Error('unsupported')
        }
    }

    temporal.with(nextYear);
    temporal.with(ChronoField.YEAR, 2020);

    temporal.with(DayOfWeek.MONDAY);
    temporal.with(Instant.now());
    temporal.with(LocalDate.now());
    temporal.with(LocalDateTime.now());
    temporal.with(LocalTime.now());
    temporal.with(Month.FEBRUARY);
    temporal.with(MonthDay.now());
    temporal.with(Year.now());
    temporal.with(YearMonth.now());
    temporal.with(ZoneOffset.ofHours(1));
}

function test_TemporalQuery() {
    const temporal1: Temporal = Instant.now();
    const temporal2: Instant = Instant.now();
    const temporal3: LocalDateTime = LocalDateTime.now();
    const temporal4: ZonedDateTime = ZonedDateTime.now();

    const chronology = temporal1.query(TemporalQueries.chronology());

    const unit = temporal2.query(TemporalQueries.precision());
    expectType<TemporalUnit | null>(unit);

    const localDate = temporal3.query(TemporalQueries.localDate());
    expectType<LocalDate | null>(localDate);

    const zoneId = temporal4.query(TemporalQueries.zoneId());
    expectType<ZoneId | null>(zoneId);

    TemporalQueries.localTime().queryFrom(Month.APRIL);
    TemporalQueries.localTime().queryFrom(Year.now());

    const fmt = DateTimeFormatter.ofPattern('');
    fmt.parse('', TemporalQueries.localDate())
    fmt.parse('', DayOfWeek.FROM);
    fmt.parse('', Instant.FROM);
    fmt.parse('', LocalDate.FROM);
    fmt.parse('', LocalDateTime.FROM);
    fmt.parse('', LocalTime.FROM);
    fmt.parse('', MonthDay.FROM);
    fmt.parse('', Year.FROM);
    fmt.parse('', YearMonth.FROM);
    fmt.parse('', ZonedDateTime.FROM);
}


function test_exceptions() {
    try {
        // imagine a not-so-good code that throws...
    } catch (error) {
        if (error instanceof ArithmeticException) {
            expectType<string>(error.message);
        }
        else if (error instanceof IllegalArgumentException) {
            expectType<string>(error.message);
        }
        else if (error instanceof IllegalStateException) {
            expectType<string>(error.message);
        }
        else if (error instanceof NullPointerException) {
            expectType<string>(error.message);
        }
        else if (error instanceof DateTimeException) {
            expectType<string>(error.message);
        }
        else if (error instanceof UnsupportedTemporalTypeException) {
            expectType<string>(error.message);
            // notice this is assignable to DateTimeException since is
            // a subtype.
            expectType<DateTimeException>(error);
        }
        else if (error instanceof DateTimeParseException) {
            expectType<string>(error.message);
            expectType<string>(error.parsedString());
            expectType<number>(error.errorIndex());
        }
    }

    const e1 = new DateTimeException('message');
    const e2 = new DateTimeParseException('message', 'text', 0, e1);
    new DateTimeException();
    new DateTimeParseException();
}

function test_TemporalField() {
    const field: TemporalField = IsoFields.DAY_OF_QUARTER;

    expectType<TemporalUnit>(field.baseUnit());
    expectType<number>(field.getFrom(LocalTime.now()));
    expectType<boolean>(field.isDateBased());
    expectType<boolean>(field.isTimeBased());
    expectType<ValueRange>(field.range());
    expectType<ValueRange>(field.rangeRefinedBy(LocalDate.now()));
    expectType<boolean>(field.isSupportedBy(LocalDate.now()));
    expectType<LocalDate>(field.adjustInto(LocalDate.now(), 1));
}

function test_ResolverStyle() {
    const rs = ResolverStyle.STRICT;

    rs.equals(ResolverStyle.LENIENT);
    
    expectType<string>(rs.toString());
    expectType<string>(rs.toJSON());
    
}

function test_SignStyle() {
    const ss = SignStyle.NEVER;

    ss.equals(SignStyle.NOT_NEGATIVE);

    expectType<string>(ss.toString());
    expectType<string>(ss.toJSON());
    
}

function test_TextStyle() {
    const ts = TextStyle.FULL;

    ts.equals(TextStyle.NARROW);

    expectType<string>(ts.toString());
    expectType<string>(ts.toJSON());
    
    expectType<TextStyle>(ts.asNormal())
    expectType<TextStyle>(ts.asStandalone())
    expectType<boolean>(ts.isStandalone())
}

/**
 * Use this to check if an expression is of type T.
 * Don't let TypeScript infer the type, give it explicitly.
 */
declare function expectType<T>(v: T): T;
