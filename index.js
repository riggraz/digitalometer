const FIRST_PUBLISH_DATE = new Date('2025-05-15');
const NOW = new Date();
const SECONDS_SINCE_MIDNIGHT = NOW.getHours() * 3600 + NOW.getMinutes() * 60 + NOW.getSeconds();
const REFRESH_SPEED = 100; // refresh every x milliseconds
const LOCALE = 'en-US';
const STOCKTICKER_LOCALE_SETTINGS = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

// --- Get DOM elements --- //
const todayDateSpan = document.getElementById('todayDate');
const volumeNumberSpan = document.getElementById('volumeNumber');
const issueNumberSpan = document.getElementById('issueNumber');

const zkbgStockTickerSpan = document.getElementById('zkbgStockTicker');
const wrldAttnStockTickerSpan = document.getElementById('wrldAttnStockTicker');
const qltyTimeStockTickerSpan = document.getElementById('qltyTimeStockTicker');

const globalSocialMediaUsageTodaySpan = document.getElementById('globalSocialMediaUsageToday');
const individualSocialMediaUsageTodaySpan = document.getElementById('individualSocialMediaUsageToday');

const globalOnlineVideosSeenTodaySpan = document.getElementById('globalOnlineVideosSeenToday');
const globalShortOnlineVideosSeenTodaySpan = document.getElementById('globalShortOnlineVideosSeenToday');
const globalLongOnlineVideosSeenTodaySpan = document.getElementById('globalLongOnlineVideosSeenToday');
const shortVsLongOnlineVideosChartCanvas = document.getElementById('shortVsLongOnlineVideosChart');

const globalNumberOfUnlocksTodaySpan = document.getElementById('globalNumberOfUnlocksToday');
const individualAvgDailyNumberOfUnlocksSpan = document.getElementById('individualAvgDailyNumberOfUnlocks');
const interruptionsChartCanvas = document.getElementById('interruptionsChart');
const lessInterruptionsChartCanvas = document.getElementById('lessInterruptionsChart');
const usageByPlatformChartCanvas = document.getElementById('usageByPlatformChart');

// --- Set subheader values --- //
todayDateSpan.innerHTML = NOW.toLocaleDateString(LOCALE, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const volumeNumber = NOW.getFullYear() - FIRST_PUBLISH_DATE.getFullYear() + 1;
volumeNumberSpan.innerHTML = volumeNumber;

const issueNumber = Math.floor((NOW - FIRST_PUBLISH_DATE) / (1000 * 60 * 60 * 24)) % 365 + 1;
issueNumberSpan.innerHTML = issueNumber;


// --- Set stockticker values --- //
const zkbgStockStartPrice = 7257.34;
let zkbgStockActualPrice = zkbgStockStartPrice + 45.78;

const wrldAttnStockStartPrice = 539.38;
let wrldAttnStockActualPrice = wrldAttnStockStartPrice - 31.02;

const qltyTimeStockStartPrice = 722.56;
let qltyTimeStockActualPrice = qltyTimeStockStartPrice - 17.13;

setInterval(function() {
  zkbgStockActualPrice += Math.random();
  zkbgStockTickerSpan.innerHTML = zkbgStockActualPrice.toLocaleString(LOCALE, STOCKTICKER_LOCALE_SETTINGS) + ' ▲ +' + (zkbgStockActualPrice - zkbgStockStartPrice).toFixed(2);

  wrldAttnStockActualPrice -= Math.random();
  wrldAttnStockTickerSpan.innerHTML = wrldAttnStockActualPrice.toLocaleString(LOCALE, STOCKTICKER_LOCALE_SETTINGS) + ' ▼ -' + (wrldAttnStockStartPrice - wrldAttnStockActualPrice).toFixed(2);

  qltyTimeStockActualPrice -= Math.random();
  qltyTimeStockTickerSpan.innerHTML = qltyTimeStockActualPrice.toLocaleString(LOCALE, STOCKTICKER_LOCALE_SETTINGS) + ' ▼ -' + (qltyTimeStockStartPrice - qltyTimeStockActualPrice).toFixed(2);
}, 5000);

// --- Data --- //
const NUMBER_OF_SECONDS_IN_A_DAY = 24 * 60 * 60;

// Sources: https://www.worldometers.info/world-population/ (which in turns is based on estimates from United Nations and U.S. Census Bureau) [accessed on 14 May 2025]
const WORLD_POPULATION = 8200000000;

// Sources: https://data.worldbank.org/indicator/SP.POP.1564.TO.ZS and https://data.worldbank.org/indicator/SP.POP.65UP.TO.ZS [accessed on 14 May 2025]
const PERC_WORLD_POPULATION_OVER_16 = 0.75;

// Sources: https://datareportal.com/reports/digital-2025-april-global-statshot page 298 [accessed on 14 May 2025]
const PERC_WORLD_POPULATION_USING_SOCIAL_MEDIA_OVER_18 = 0.87;

// SOCIAL MEDIA
const WORLD_POPULATION_OVER_16_USING_SOCIAL_MEDIA = WORLD_POPULATION * PERC_WORLD_POPULATION_OVER_16 * PERC_WORLD_POPULATION_USING_SOCIAL_MEDIA_OVER_18;

// Sources: https://datareportal.com/reports/digital-2025-april-global-statshot page 288 [accessed on 14 May 2025]
const AVG_DAILY_SOCIAL_MEDIA_USAGE_OVER_16 = 9600; // seconds

const INDIVIDUAL_SOCIAL_MEDIA_USAGE_EACH_SECOND = AVG_DAILY_SOCIAL_MEDIA_USAGE_OVER_16 / NUMBER_OF_SECONDS_IN_A_DAY;
const GLOBAL_SOCIAL_MEDIA_USAGE_EACH_SECOND = INDIVIDUAL_SOCIAL_MEDIA_USAGE_EACH_SECOND * WORLD_POPULATION_OVER_16_USING_SOCIAL_MEDIA;

// ONLINE VIDEOS
// Sources: https://datareportal.com/reports/digital-2025-april-global-statshot page 220 [accessed on 15 May 2025]
const AVG_DAILY_SHORT_ONLINE_VIDEOS_SEEN_OVER_16 = 3403; // seconds

// Sources: https://datareportal.com/reports/digital-2025-april-global-statshot page 224 [accessed on 15 May 2025]
const AVG_DAILY_LONG_ONLINE_VIDEOS_SEEN_OVER_16 = 2537; // seconds

const AVG_DAILY_ONLINE_VIDEOS_SEEN_OVER_16 = AVG_DAILY_SHORT_ONLINE_VIDEOS_SEEN_OVER_16 + AVG_DAILY_LONG_ONLINE_VIDEOS_SEEN_OVER_16; // seconds

const GLOBAL_SHORT_ONLINE_VIDEOS_SEEN_EACH_SECOND = AVG_DAILY_SHORT_ONLINE_VIDEOS_SEEN_OVER_16 * WORLD_POPULATION_OVER_16_USING_SOCIAL_MEDIA / NUMBER_OF_SECONDS_IN_A_DAY;
const GLOBAL_LONG_ONLINE_VIDEOS_SEEN_EACH_SECOND = AVG_DAILY_LONG_ONLINE_VIDEOS_SEEN_OVER_16 * WORLD_POPULATION_OVER_16_USING_SOCIAL_MEDIA / NUMBER_OF_SECONDS_IN_A_DAY;
const GLOBAL_ONLINE_VIDEOS_SEEN_EACH_SECOND = GLOBAL_SHORT_ONLINE_VIDEOS_SEEN_EACH_SECOND + GLOBAL_LONG_ONLINE_VIDEOS_SEEN_EACH_SECOND;

// UNLOCKS
// Sources: https://www.androidauthority.com/phone-usage-habits-unlocking-poll-results-1182239/ (I took the middle points of ranges, and for >150 I just assumed 151 (conservative))
const AVG_DAILY_NUMBER_OF_UNLOCKS = (25 * 0.2658) + (75 * 0.4354) + (125 * 0.1916) + (151 * 0.1072);

const GLOBAL_NUMBER_OF_UNLOCKS_EACH_SECOND = AVG_DAILY_NUMBER_OF_UNLOCKS * WORLD_POPULATION_OVER_16_USING_SOCIAL_MEDIA / NUMBER_OF_SECONDS_IN_A_DAY;




// LET'S GO
let globalSocialMediaUsageToday = SECONDS_SINCE_MIDNIGHT * GLOBAL_SOCIAL_MEDIA_USAGE_EACH_SECOND;
let individualSocialMediaUsageToday = SECONDS_SINCE_MIDNIGHT * INDIVIDUAL_SOCIAL_MEDIA_USAGE_EACH_SECOND;

let globalOnlineVideosSeenToday = SECONDS_SINCE_MIDNIGHT * GLOBAL_ONLINE_VIDEOS_SEEN_EACH_SECOND;
let globalShortOnlineVideosSeenToday = SECONDS_SINCE_MIDNIGHT * GLOBAL_SHORT_ONLINE_VIDEOS_SEEN_EACH_SECOND;
let globalLongOnlineVideosSeenToday = SECONDS_SINCE_MIDNIGHT * GLOBAL_LONG_ONLINE_VIDEOS_SEEN_EACH_SECOND;

let globalNumberOfUnlocksToday = SECONDS_SINCE_MIDNIGHT * GLOBAL_NUMBER_OF_UNLOCKS_EACH_SECOND;


individualAvgDailyNumberOfUnlocksSpan.innerHTML = Math.round(AVG_DAILY_NUMBER_OF_UNLOCKS).toLocaleString(LOCALE);

setInterval(function() {
  globalSocialMediaUsageToday += GLOBAL_SOCIAL_MEDIA_USAGE_EACH_SECOND / (1000 / REFRESH_SPEED);
  globalSocialMediaUsageTodaySpan.innerHTML = Math.round(globalSocialMediaUsageToday / 60 / 60).toLocaleString(LOCALE);

  individualSocialMediaUsageToday += INDIVIDUAL_SOCIAL_MEDIA_USAGE_EACH_SECOND / (1000 / REFRESH_SPEED);
  individualSocialMediaUsageTodaySpan.innerHTML = Math.round(individualSocialMediaUsageToday / 60).toLocaleString(LOCALE);

  globalOnlineVideosSeenToday += GLOBAL_ONLINE_VIDEOS_SEEN_EACH_SECOND / (1000 / REFRESH_SPEED);
  globalOnlineVideosSeenTodaySpan.innerHTML = Math.round(globalOnlineVideosSeenToday / 60 / 60).toLocaleString(LOCALE);

  globalShortOnlineVideosSeenToday += GLOBAL_SHORT_ONLINE_VIDEOS_SEEN_EACH_SECOND / (1000 / REFRESH_SPEED);
  globalShortOnlineVideosSeenTodaySpan.innerHTML = Math.round(globalShortOnlineVideosSeenToday / 60 / 60).toLocaleString(LOCALE);

  globalLongOnlineVideosSeenToday += GLOBAL_LONG_ONLINE_VIDEOS_SEEN_EACH_SECOND / (1000 / REFRESH_SPEED);
  globalLongOnlineVideosSeenTodaySpan.innerHTML = Math.round(globalLongOnlineVideosSeenToday / 60 / 60).toLocaleString(LOCALE);

  globalNumberOfUnlocksToday += GLOBAL_NUMBER_OF_UNLOCKS_EACH_SECOND / (1000 / REFRESH_SPEED);
  globalNumberOfUnlocksTodaySpan.innerHTML = Math.round(globalNumberOfUnlocksToday).toLocaleString(LOCALE);
}, REFRESH_SPEED);


// Charts

// Short VS Long videos chart
const percShortOnlineVideosSeenToday = Math.round(globalShortOnlineVideosSeenToday / globalOnlineVideosSeenToday * 100);
new Chart(shortVsLongOnlineVideosChartCanvas, {
  type: 'bar',
  data: {
    labels: ['Short videos', 'Long videos'],
    datasets: [{
      label: '% of total',
      data: [percShortOnlineVideosSeenToday, 100 - percShortOnlineVideosSeenToday],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      borderWidth: 1
    }],
  },
  options: {
    aspectRatio: 1,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  }
});


// Unlocks/checks/interruptions chart
// Create an array of 1440 zeros (minutes in a day)
const unlocksArray = Array(1440).fill(0);

// Set 79 elements to 1, evenly spaced
const unlocksCount = 79;
for (let i = 0; i < unlocksCount; i++) {
  const index = Math.round(i * (unlocksArray.length - 1) / (unlocksCount - 1));
  unlocksArray[index] = 1;
}

new Chart(interruptionsChartCanvas, {
  type: 'line',
  data: {
    labels: Array.from({length: 1440}, (_, i) => i + 1), // minutes in a day
    datasets: [{
      label: 'Unlocks during the day',
      data: unlocksArray,
      borderColor: 'rgb(198, 94, 50)',
      backgroundColor: 'rgba(198, 94, 50, 0.6)',
      tension: 0.1,
    }]
  },
  options: {
    borderWidth: 1,
    pointRadius: 1,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Unlock?'
        },
        ticks: {
          display: false
        }
      },
      x: {
        title: {
          display: true,
          text: 'Minute of Day'
        },
        ticks: {
          // display: false
        }
      }
    }
  }
});

// Less unlocks/checks/interruptions chart
const lessUnlocksArray = Array(1440).fill(0);

// Set 10 elements to 1, evenly spaced
const lessUnlocksCount = 10;
for (let i = 0; i < lessUnlocksCount; i++) {
  const index = Math.round(i * (lessUnlocksArray.length - 1) / (lessUnlocksCount - 1));
  lessUnlocksArray[index] = 1;
}

new Chart(lessInterruptionsChartCanvas, {
  type: 'line',
  data: {
    labels: Array.from({length: 1440}, (_, i) => i + 1), // minutes in a day
    datasets: [{
      label: 'Unlocks during the day',
      data: lessUnlocksArray,
      borderColor: 'rgb(198, 94, 50)',
      backgroundColor: 'rgba(198, 94, 50, 0.6)',
      tension: 0.1,
    }]
  },
  options: {
    borderWidth: 1,
    pointRadius: 1,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Unlock?'
        },
        ticks: {
          display: false
        }
      },
      x: {
        title: {
          display: true,
          text: 'Minute of Day'
        },
        ticks: {
          // display: false
        }
      }
    }
  }
});

// Daily average usage by platform chart
new Chart(usageByPlatformChartCanvas, {
  type: 'bar',
  data: {
    labels: [
      'TikTok',
      'YouTube',
      'Instagram',
      'Facebook',
      'WhatsApp',
      'imo',
      'Telegram',
      'X',
      'Reddit',
    ],
    datasets: [{
      label: 'Daily average usage',
      data: [
        95,
        84,
        70,
        64,
        60,
        55,
        31,
        28,
        21
      ],
      backgroundColor: [
        'rgba(0, 0, 0, 0.6)',
        'rgba(255, 0, 0, 0.6)',
        'rgba(131, 58, 180, 0.6)',
        'rgba(24, 119, 242, 0.6)',
        'rgba(37, 211, 102, 0.6)',
        'rgba(0, 174, 239, 0.6)',
        'rgba(0, 136, 204, 0.6)',
        'rgba(0, 0, 0, 0.6)',
        'rgba(255, 69, 0, 0.6)'
      ],
      borderColor: [
        'rgb(0, 0, 0)',
        'rgb(255, 0, 0)',
        'rgb(131, 58, 180)',
        'rgb(24, 119, 242)',
        'rgb(37, 211, 102)',
        'rgb(0, 174, 239)',
        'rgb(0, 136, 204)',
        'rgb(0, 0, 0)',
        'rgb(255, 69, 0)'
      ],
      borderWidth: 1,
      barThickness: 25,
    }]
  },
  options: {
    indexAxis: 'y',
    aspectRatio: 0.75,
  }
})