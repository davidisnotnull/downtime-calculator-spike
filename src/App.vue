<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12">
        <h1>{{ content.mainTitle }}</h1>
        <p>
          {{ content.introText }}
        </p>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <h2>Recovery & Data Storage</h2>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="mb-3 row">

          <label for="businessSurvive" class="col-sm-9 col-form-label">
            <Tooltip :tooltipText="tooltips.one" :position="'right'" class="icon">?</Tooltip>How long can your business
            survive without access
            to your IT
            systems?
          </label>
          <div class="col-sm-3">
            <div class="input-group">
              <input type="number" class="form-control" id="businessSurvive" placeholder="" v-model="survivalTime" />
              <span class="input-group-text">hrs</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="acceptableHoursToLose" class="col-sm-9 col-form-label">
            <Tooltip :tooltipText="tooltips.two" :position="'right'" class="icon">?</Tooltip>How many hours of work are
            you willing to
            lose / repeat?
          </label>
          <div class="col-sm-3">
            <div class="input-group">
              <input type="number" class="form-control" id="acceptableHoursToLose" placeholder=""
                v-model="permissibleHoursLost" />
              <span class="input-group-text">hrs</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="dataOnCriticalSystems" class="col-sm-9 col-form-label">
            <Tooltip :tooltipText="tooltips.three" :position="'right'" class="icon">?</Tooltip>How much data do you have
            on critical
            business systems?
          </label>
          <div class="col-sm-3">
            <div class="input-group">
              <input type="number" class="form-control" id="dataOnCriticalSystems" placeholder=""
                v-model="criticalSystemData" />
              <span class="input-group-text">Gb</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="backupFrequency" class="col-sm-9 col-form-label">
            <Tooltip :tooltipText="tooltips.four" :position="'right'" class="icon">?</Tooltip>How often do you back up
            this data?
          </label>
          <div class="col-sm-3">
            <div class="input-group">
              <div class="row mb-3">
                <div class="col-6">
                  <div class="input-group">
                    <input type="number" class="form-control" id="backupFrequencyHrs" placeholder="" min="0"
                      v-model="backupHrs" />
                    <span class="input-group-text">hrs</span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-group">
                    <input type="number" class="form-control" id="backupFrequencyMins" placeholder="" min="0" max="45"
                      step="15" v-model="backupMins" />
                    <span class="input-group-text">mins</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-center">
                  <button @click="noBackupSelected()" type="button" :class="[
                    noBackup ? 'btn btn-primary active' : 'btn btn-primary',
                  ]">
                    I don't currently backup my data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!noBackup">
          <div class="mb-3 row">
            <label for="responseLeadTimeHrs" class="col-sm-9 col-form-label">
              <Tooltip :tooltipText="tooltips.five" :position="'right'" class="icon">?</Tooltip>On average how long does
              it take your
              client to notify you of an
              issue and for you to start trouble shooting the downtime
              incident?
            </label>
            <div class="col-sm-3">
              <div class="row mb-3">
                <div class="col-6">
                  <div class="input-group">
                    <input type="number" class="form-control" id="responseLeadTimeHrs" placeholder="" min="0"
                      v-model="leadTimeHrs" />
                    <span class="input-group-text">hrs</span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-group">
                    <input type="number" class="form-control" id="responseLeadTimeMins" placeholder="" min="0" max="45"
                      step="15" v-model="leadTimeMins" />
                    <span class="input-group-text">mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3 row">
            <label for="backupLocation" class="col-sm-9 col-form-label">
              <Tooltip :tooltipText="tooltips.six" :position="'right'" class="icon">?</Tooltip>Where do you currently
              store your
              backups?
            </label>
            <div class="col-sm-3">
              <div class="btn-group">
                <button @click="setLocalBackup()" type="button" id="localBackup" :class="[
                  cloudBackup ? 'btn btn-primary' : 'btn btn-primary active',
                ]">
                  Local
                </button>
                <button @click="setCloudBackup()" type="button" id="cloudBackup" :class="[
                  cloudBackup ? 'btn btn-primary active' : 'btn btn-primary',
                ]">
                  Cloud
                </button>
              </div>
            </div>
          </div>
          <div v-if="cloudBackup" class="mb-3 row">
            <label for="cloudRecoveryDataRate" class="col-sm-9 col-form-label">
              <Tooltip :tooltipText="tooltips.seven" :position="'right'" class="icon">?</Tooltip>What is the download
              speed from your
              cloud backup location?
            </label>
            <div class="col-sm-3">
              <div class="input-group">
                <input type="number" class="form-control" id="cloudRecoveryDataRate" placeholder="" min="0"
                  v-model="cloudTransferSpeed" />
                <span class="input-group-text">Mbps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h2>Downtime & Recovery Costs</h2>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="mb-3 row">
          <label for="numberOfEmployees" class="col-sm-9 col-form-label">
            <Tooltip :tooltipText="tooltips.eight" :position="'right'" class="icon">?</Tooltip>How many employees do you
            have?
          </label>
          <div class="col-sm-3">
            <div class="input-group">
              <input type="number" class="form-control" id="numberOfEmployees" placeholder="" min="1"
                v-model="numberOfEmployees" />
              <span class="input-group-text">people</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="averageSalary" class="col-sm-9 col-form-label">
            <Tooltip :tooltipText="tooltips.nine" :position="'right'" class="icon">?</Tooltip>What is their average
            annual salary per
            employee?
          </label>
          <div class="col-sm-3">
            <div class="input-group">
              <span class="input-group-text">{{ currencySymbol }}</span>
              <input type="number" class="form-control" id="averageSalary" placeholder="" min="1"
                v-model="averageSalaryPerEmployee" />
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="averageOverhead" class="col-sm-9 col-form-label">
            <Tooltip :tooltipText="tooltips.ten" :position="'right'" class="icon">?</Tooltip>What is the average annual
            overhead cost of an
            employee?
          </label>
          <div class="col-sm-3">
            <div class="input-group">
              <span class="input-group-text">{{ currencySymbol }}</span>
              <input type="number" class="form-control" id="averageOverhead" placeholder="" min="1"
                v-model="averageOverheadPerEmployee" />
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="annualRevenue" class="col-sm-9 col-form-label">
            <Tooltip :tooltipText="tooltips.eleven" :position="'right'" class="icon">?</Tooltip>What is your business's
            annual revenue?
          </label>
          <div class="col-sm-3">
            <div class="input-group">
              <span class="input-group-text">{{ currencySymbol }}</span>
              <input type="number" class="form-control" id="annualRevenue" placeholder="" min="1"
                v-model="annualRevenue" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4 mb-4">
      <hr />
    </div>

    <div class="row">
      <div class="col-12 col-md-6 g-0">
        <section class="results">
          <header>Current Solution</header>
          <div class="main">
            <div class="mb-3">
              <h3 class="resultHeading">Time between backups</h3>
              <p v-if="!noBackup" class="result">{{ backupHrs }}hrs {{ backupMins }}mins</p>
              <p v-if="noBackup" class="result">No Backup Taken</p>
            </div>
            <div class="mb-3">
              <h3 class="resultHeading">Recovery Processing Time</h3>
              <p v-if="!noBackup" class="result">{{ recoveryProcessingTime }}</p>
              <p v-if="noBackup" class="result">No Backup Taken</p>
            </div>
            <div class="mb-4">
              <h3 class="resultHeading">Estimated Risk</h3>
              <div :class="riskClass" role="alert">{{ calculatedRisk }}</div>
            </div>
            <div class="mb-3">
              <h3 class="summaryHeading">Summary</h3>
              <hr />
              <div v-if="!noBackup" class="mb-3">
                <h3 class="resultHeading">Lead Time Cost</h3>
                <p class="result">
                  {{ currencySymbol }}{{ leadTimeCost }}
                  <span>(provided as {{ leadTimeHrs }}hrs
                    {{ leadTimeMins }}mins)</span>
                </p>
              </div>
              <div v-if="!noBackup" class="mb-3">
                <h3 class="resultHeading">Recovery Time Cost</h3>
                <p class="result">
                  {{ currencySymbol }}{{ recoveryTimeCost }}
                  <span>(calculated at {{ recoveryProcessingTime }})</span>
                </p>
              </div>
              <div class="mb-3">
                <h3 class="resultHeading">Total Downtime Cost</h3>
                <p v-if="!noBackup" class="result">
                  {{ currencySymbol }}{{ totalDowntimeCost }}
                  <span>(calculated at {{ totalDowntime }})</span>
                </p>
                <p v-if="noBackup" class="result">
                  Possible Business Closure
                </p>
              </div>
              <div class="mb-3">
                <span class="small">*all losses are merely an estimation of losses associated with
                  technology, and does not reflect a calculation of actual losses
                  to your business.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="col-12 col-md-6 g-0">
        <section class="proposal">
          <header>
            MSP Solution
          </header>
          <div class="main">
            <div class="mb-3">
              <h3 class="resultHeading">Time between backups</h3>
              <p class="result">{{ msp.timeBetweenBackups }} mins</p>
            </div>
            <div class="mb-3">
              <h3 class="resultHeading">Average Recovery Processing Time</h3>
              <p class="result">{{ msp.recoveryProcessingTime }} mins*</p>
              <span class="small">
                *Time to virtualization will vary depending on numerous factors including, but not limited to, the size
                of the SIRIS device, the availability and speeds of other local resources, the number of applications
                you are running, and server load.
              </span>
            </div>
            <div class="mb-3">
              <h3 class="summaryHeading">Summary</h3>
              <hr />
            </div>
            <div class="mb-3">
              <h3 class="resultHeading">Lead Time Cost</h3>
              <p class="result">
                {{ currencySymbol }}{{ leadTimeCost }}
                <span>(provided as {{ leadTimeHrs }}hrs
                  {{ leadTimeMins }}mins)</span>
              </p>
            </div>
            <div class="mb-3">
              <h3 class="resultHeading">Recovery Time Cost</h3>
              <p class="result">
                {{ currencySymbol }}{{ mspRecoveryCost }}
                <span>(calculated at {{ msp.recoveryProcessingTime }} mins)</span>
              </p>
            </div>
            <div class="mb-3">
              <h3 class="resultHeading">Total Downtime Cost</h3>
              <p class="result">
                {{ currencySymbol }}{{ mspDowntimeCost }}
                <span>(calculated at {{ mspDowntime }})</span>
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "./components/Tooltip.vue";

export default {
  name: "App",
  components: {
    Tooltip,
  },
  data() {
    return {
      cloudBackup: false,
      noBackup: false,
      survivalTime: 72,
      permissibleHoursLost: 12,
      criticalSystemData: 2000,
      backupHrs: 12,
      backupMins: 0,
      leadTimeHrs: 0,
      leadTimeMins: 30,
      cloudTransferSpeed: 70,
      localTransferSpeed: 700,
      numberOfEmployees: 40,
      averageSalaryPerEmployee: 25000,
      averageOverheadPerEmployee: 10000,
      annualRevenue: 5000000,
      bitConversion: 8388608,
      recoveryTime: 0,
      riskClass: "alert alert-danger",
      currencySymbol: "£",
      content: {
        mainTitle: "Recovery Time & Downtime Cost Calculator",
        introText: "The cost of a technology outage can cripple a business. Use our Recovery Time & Downtime Cost Calculator to focus on a handful of simple metrics that might come into play during a downtime event, and start a general analysis of what an outage could mean to your business. The results of this calculator are meant to help estimate loss, and does not calculate actual loss."
      },
      msp: {
        timeBetweenBackups: 5,
        recoveryProcessingTime: 6,
      },
      tooltips: {
        one: "Systems include, but are not limited to, email, documents, specific business systems (e.g., point of sale, shipping & logistics,databases), etc.?",
        two: "If disaster strikes, work often stops and any work that does occur often must be redone. How many hours of work are you willing to repeat in a worst case scenario?",
        three: "In order to give you a correct calculation we need to get an idea of how much data you have in your system across your organization.",
        four: "What is the timeframe between each of your backups? E.g. every hour, once a day, once a week.",
        five: "From when disaster strikes, how long does it for your end user to notify you, for you to assess the situation, access your backups, and start the recovery process? Think of this a your reponse time.",
        six: "Storing your data locally is designed for fast data transfers, however you are at risk if there is a disaster in the office such as fire, floods or theft. Cloud data is stored off-site, such as in a Datto data center, which brings an extra level of availability albeit at a slower speed for full bare metal restores.",
        seven: "Speed of cloud recovery comes down to the amount of data you are trying to recover and your download speed. Devices with slower connections will take longer to recover.",
        eight: "Nearly every employee will be impacted by an IT outage and will not be able to perform their job obligations to a certain degree. We recommend including the entire staff in this field.",
        nine: "Even if the business stops due to an outage and employees are not able to perform some, or all, of their duties, employee wages typically are still paid. We are assuming yours will need to be paid, and this must be included in your cost of downtime calculations.",
        ten: "All staff come with overhead costs like, gas, electric, rent, etc. Normally, this is about 50% of the average salary.",
        eleven: "For most businesses, an outage will halt the ability to product and accrue revenue. We are assuming that your revenue will case during an outage, and so annual revenue helps to calculate the average cost of lost revenue during downtime.",
      }
    };
  },
  setup() { },
  created() { },
  computed: {
    recoveryProcessingTime() {
      let processingTime = this.calculateRecoveryTime();
      return this.parseUserFriendlyTime(processingTime);
    },
    calculatedRisk() {
      return this.calculateRisk();
    },
    recoveryTimeCost() {
      let recoveryTimeCost = this.getRecoveryTimeCost();
      return this.parseUserFriendlyCurrency(recoveryTimeCost);
    },
    leadTimeCost() {
      let leadTimeCost = this.getLeadTimeCost();
      return this.parseUserFriendlyCurrency(leadTimeCost);
    },
    totalDowntimeCost() {
      let totalDowntimeCost = this.getDowntimeCost();
      return this.parseUserFriendlyCurrency(totalDowntimeCost);
    },
    totalDowntime() {
      let totalDowntime = this.getTotalRecoveryTime();
      return this.parseUserFriendlyTime(totalDowntime);
    },
    mspRecoveryCost() {
      let mspRecovery = this.getMSPRecoveryCost();
      return this.parseUserFriendlyCurrency(mspRecovery);
    },
    mspDowntimeCost() {
      let totalDowntimeCost = this.getMSPDowntimeCost();
      return this.parseUserFriendlyCurrency(totalDowntimeCost);
    },
    mspDowntime() {
      let totalMspDowntime = this.getMSPDowntime();
      return this.parseUserFriendlyTime(totalMspDowntime);
    }
  },
  methods: {
    setCloudBackup() {
      this.cloudBackup = true;
    },
    setLocalBackup() {
      this.cloudBackup = false;
    },
    noBackupSelected() {
      this.noBackup = !this.noBackup;
    },
    calculateRecoveryTime() {
      let recoveryTime = 0;
      if (this.cloudBackup === false) {
        recoveryTime =
          (this.bitConversion * this.criticalSystemData) /
          (this.localTransferSpeed * 1024) /
          60;
      } else {
        recoveryTime =
          (this.bitConversion * this.criticalSystemData) /
          (this.cloudTransferSpeed * 1024) /
          60;
      }
      return recoveryTime;
    },
    calculateRisk(recoveryTime) {
      let riskValue = recoveryTime / 3600 / this.survivalTime;
      switch (riskValue) {
        case riskValue > 0.8:
          this.riskClass = "alert alert-danger";
          return "Critical";
        case riskValue >= 0.6 && riskValue <= 0.8:
          this.riskClass = "alert alert-warning";
          return "Warning";
        case riskValue < 0.6:
          this.riskClass = "alert alert-success";
          return "Acceptable";
        default:
          this.riskClass = "alert alert-danger";
          return "Critical";
      }
    },
    getResponseTimeInHours() {
      let responseTime = this.leadTimeHrs + this.leadTimeMins / 60;
      return responseTime;
    },
    getTotalRecoveryTime() {
      let responseTime = parseFloat(this.getResponseTimeInHours() * 60);
      let recoveryTime = parseFloat(this.calculateRecoveryTime());
      let totalRecoveryTime = responseTime + recoveryTime;
      return totalRecoveryTime;
    },
    downtimeRevenueCostPerHour() {
      let costOfEmployeesPerHour =
        this.numberOfEmployees * (this.averageSalaryPerEmployee / 40 / 52);
      let costOfOverheadsPerHour = this.averageOverheadPerEmployee / 40 / 52;
      let costOfRevenuePerHour = this.annualRevenue / 40 / 52;
      let totalCost =
        costOfEmployeesPerHour + costOfOverheadsPerHour + costOfRevenuePerHour;

      return totalCost;
    },
    getRecoveryTimeCost() {
      let costPerHour = this.downtimeRevenueCostPerHour();
      let totalRecoveryTime = parseFloat(this.calculateRecoveryTime());
      let recoveryTimeInHours = totalRecoveryTime / 60;

      let recoveryCost = costPerHour * recoveryTimeInHours;
      return this.parseCurrencyForCalculation(recoveryCost);
    },
    getLeadTimeCost() {
      let costPerHour = this.downtimeRevenueCostPerHour();
      let leadTimeCost = costPerHour * this.getResponseTimeInHours();
      return this.parseCurrencyForCalculation(leadTimeCost);
    },
    getDowntimeCost() {
      let leadTimeCost = parseFloat(this.getLeadTimeCost());
      let recoveryTimeCost = parseFloat(this.getRecoveryTimeCost());
      let downtimeCost = leadTimeCost + recoveryTimeCost;

      return this.parseCurrencyForCalculation(downtimeCost);
    },
    getMSPRecoveryCost() {
      let mspRecoveryTime = parseFloat(this.msp.recoveryProcessingTime / 60);
      let recoveryTimeCost = parseFloat(this.downtimeRevenueCostPerHour());

      let mspRecoveryCost = mspRecoveryTime * recoveryTimeCost;
      return this.parseCurrencyForCalculation(mspRecoveryCost);
    },
    getMSPDowntimeCost() {
      let mspRecoveryCost = parseFloat(this.getMSPRecoveryCost());
      let leadTimeCost = parseFloat(this.getLeadTimeCost());
      let downtimeCost = leadTimeCost + mspRecoveryCost;

      return this.parseCurrencyForCalculation(downtimeCost);
    },
    getMSPDowntime() {
      let mspRecoveryTime = parseFloat(this.msp.recoveryProcessingTime);
      let leadTime = parseFloat((this.leadTimeHrs * 60) + this.leadTimeMins);
      let mspDowntime = mspRecoveryTime + leadTime;
      return mspDowntime;
    },
    parseUserFriendlyTime(timeToParse) {
      let hours = timeToParse / 60;
      let floorHours = Math.floor(hours);
      let minutes = (hours - floorHours) * 60;
      let roundMinutes = Math.round(minutes);
      return floorHours + "hrs " + roundMinutes + "mins";
    },
    parseUserFriendlyCurrency(currencyToParse) {
      let currencyLocale = Intl.NumberFormat("en-US");
      let roundedCurrency = currencyLocale.format(currencyToParse);
      return roundedCurrency;
    },
    parseCurrencyForCalculation(currencyToRound) {
      let decimalNumber = 0;
      decimalNumber = (Math.round(currencyToRound * 100) / 100).toFixed(2);
      return decimalNumber;
    },
  },
};
</script>

<style scoped>
section.results .main,
section.proposal .main {
  padding: 0 20px;
}

section.results header {
  margin: 0 0 20px 0;
  padding: 10px 20px;
  background-color: #dddddd;
  font-size: 26px;
  color: #4d5967;
}

section.proposal header {
  margin: 0 0 20px 0;
  padding: 10px 20px;
  background-color: #199ed9;
  font-size: 26px;
  color: #ffffff;
}

section.results h3.resultHeading,
section.proposal h3.resultHeading {
  color: #9ba7b5;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
}

section.results h3.summaryHeading,
section.proposal h3.summaryHeading {
  color: #333333;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
}

section.results p.result,
section.proposal p.result {
  font-size: 24px;
  color: #4d5967;
}

section.results p.result span,
section.proposal p.result span {
  font-size: 16px;
}

.small {
  color: #9ba7b5;
}

.icon {
  float: left;
  background: #0b5ed7;
  width: 30px;
  border-radius: 50%;
  text-align: center;
  margin-right: 10px;
  color: #ffffff;
  font-size: 13px;
  padding: 5px 0;
}
</style>