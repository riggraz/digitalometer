const now = new Date();
const SECONDS_SINCE_MIDNIGHT = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
const REFRESH_SPEED = 100; // refresh every x milliseconds

// --- Get DOM elements --- //
const globalSocialMediaUsageTodaySpan = document.getElementById('globalSocialMediaUsageToday');
const individualSocialMediaUsageTodaySpan = document.getElementById('individualSocialMediaUsageToday');

// --- Data --- //
const NUMBER_OF_SECONDS_IN_A_DAY = 24 * 60 * 60;

// Sources: https://www.worldometers.info/world-population/ (which in turns is based on estimates from United Nations and U.S. Census Bureau) [accessed on 14 May 2025]
const WORLD_POPULATION = 8200000000;

// Sources: https://data.worldbank.org/indicator/SP.POP.1564.TO.ZS and https://data.worldbank.org/indicator/SP.POP.65UP.TO.ZS [accessed on 14 May 2025]
const PERC_WORLD_POPULATION_OVER_16 = 0.75;

// Sources: https://datareportal.com/reports/digital-2025-april-global-statshot page 298 [accessed on 14 May 2025]
const PERC_WORLD_POPULATION_USING_SOCIAL_MEDIA_OVER_18 = 0.87;

// SOCIAL MEDIA
const WORLD_POPULATION_OVER_16_USING_SOCIAL_MEDIA = WORLD_POPULATION * PERC_WORLD_POPULATION_OVER_16 * PERC_WORLD_POPULATION_OVER_16;

// Sources: https://datareportal.com/reports/digital-2025-april-global-statshot page 288 [accessed on 14 May 2025]
const AVG_DAILY_SOCIAL_MEDIA_USAGE_OVER_16 = 9600 // seconds

const INDIVIDUAL_SOCIAL_MEDIA_USAGE_EACH_SECOND = AVG_DAILY_SOCIAL_MEDIA_USAGE_OVER_16 / NUMBER_OF_SECONDS_IN_A_DAY;
const GLOBAL_SOCIAL_MEDIA_USAGE_EACH_SECOND = INDIVIDUAL_SOCIAL_MEDIA_USAGE_EACH_SECOND * WORLD_POPULATION_OVER_16_USING_SOCIAL_MEDIA;

// LET'S GO
let globalSocialMediaUsageToday = SECONDS_SINCE_MIDNIGHT * GLOBAL_SOCIAL_MEDIA_USAGE_EACH_SECOND;
let individualSocialMediaUsageToday = SECONDS_SINCE_MIDNIGHT * INDIVIDUAL_SOCIAL_MEDIA_USAGE_EACH_SECOND;

setInterval(function() {
  globalSocialMediaUsageToday += GLOBAL_SOCIAL_MEDIA_USAGE_EACH_SECOND / (1000 / REFRESH_SPEED);
  globalSocialMediaUsageTodaySpan.innerHTML = Math.round(globalSocialMediaUsageToday / 60 / 60).toLocaleString();

  individualSocialMediaUsageToday += INDIVIDUAL_SOCIAL_MEDIA_USAGE_EACH_SECOND / (1000 / REFRESH_SPEED);
  individualSocialMediaUsageTodaySpan.innerHTML = Math.round(individualSocialMediaUsageToday / 60).toLocaleString();
}, REFRESH_SPEED);