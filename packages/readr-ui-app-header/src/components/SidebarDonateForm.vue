<template>
  <div class="donate">
    <header class="donate__header header">
      <img src="https://www.readr.tw/public/2.0/decorations/donate.png" />
      <div class="header__titles">
        <p>贊助 READr</p>
        <p>支持更多優質內容</p>
      </div>
    </header>
    <div class="donate__block type">
      <label
        :class="{ active: donateType === 'subscription' }"
        class="type__radio"
      >
        <input
          v-model="donateType"
          type="radio"
          name="donateType"
          value="subscription"
        />
        <span for="male">每月定額</span>
      </label>
      <label :class="{ active: donateType === 'once' }" class="type__radio">
        <input
          v-model="donateType"
          type="radio"
          name="donateType"
          value="once"
        />
        <span for="male">單筆贊助</span>
      </label>
    </div>
    <div class="donate__block donate__donate-amount donate-amount">
      <h2 class="bold">
        贊助金額
      </h2>
      <div class="donate-amount__coins coins">
        <div class="coins__row">
          <button
            :class="[
              'coins__coin',
              'coin',
              { 'coin--selected': donateAmountSelected === 150 }
            ]"
            @click="toggleDomateAmount(150)"
          >
            150 元
          </button>
          <button
            :class="[
              'coins__coin',
              'coin',
              { 'coin--selected': donateAmountSelected === 200 }
            ]"
            @click="toggleDomateAmount(200)"
          >
            200 元
          </button>
          <button
            :class="[
              'coins__coin',
              'coin',
              { 'coin--selected': donateAmountSelected === 500 }
            ]"
            @click="toggleDomateAmount(500)"
          >
            500 元
          </button>
          <button
            :class="[
              'coins__coin',
              'coin',
              { 'coin--selected': donateAmountSelected === 1000 }
            ]"
            @click="toggleDomateAmount(1000)"
          >
            1000 元
          </button>
          <button
            :class="[
              'coins__coin',
              'coin',
              { 'coin--selected': isDonateAmountCustom }
            ]"
            @click="toggleDomateAmount('custom')"
          >
            其他
          </button>
        </div>
        <div v-show="isDonateAmountCustom" class="coins__row">
          <div class="coins__custom-coin-input custom-coin-input">
            <div class="custom-coin-input__top">
              <input v-model.number.lazy="donateAmountCustom" type="number" />
              <p>元</p>
            </div>
            <div class="custom-coin-input__bottom">
              <p>(單筆贊助最低 30 元，最高 2000 元)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="donate__block donate__contact contact">
      <h2 class="bold">
        付款人資訊
      </h2>
      <div class="contact__form form">
        <div class="form__row form__contact-name">
          <h2>姓名</h2>
          <input v-model="contactInputs.contactName" type="text" />
        </div>
        <div class="form__row form__contact-email">
          <h2>Email</h2>
          <input v-model="contactInputs.contactEmail" type="email" />
        </div>
      </div>
    </div>
    <div
      class="donate__block donate__payment-method-forms payment-method-forms"
    >
      <!-- <h1>付款方式</h1> -->
      <div class="payment-method-forms__form form">
        <h2 class="bold">
          信用卡資訊
        </h2>
        <div class="form__row form__card-number">
          <h2>卡號</h2>
          <div id="card-number" class="tpfield" />
        </div>
        <div class="form__row form__expire-date">
          <h2>到期日</h2>
          <div id="card-expiration-date" class="tpfield" />
        </div>
        <div class="form__row form__security-code">
          <h2>末三碼</h2>
          <div id="card-ccv" class="tpfield" />
        </div>
      </div>
    </div>
    <div class="donate__block donate__carriers carriers">
      <h2 class="bold">
        電子發票
      </h2>
      <div class="carriers__carrier carrier">
        <RadioItem
          :value="'carrierEmail'"
          :value-selected="carrierTypeSelected"
          @change="changeCarrierType"
        >
          Email 載具
        </RadioItem>
        <div
          v-show="carrierTypeSelected === 'carrierEmail'"
          class="carrier__inputs"
        >
          <input
            v-model="carrierInputs.carrierEmail"
            type="text"
            placeholder="如：readr@readr.tw"
          />
        </div>
      </div>
      <div class="carriers__carrier carrier">
        <RadioItem
          :value="'carrierPhone'"
          :value-selected="carrierTypeSelected"
          @change="changeCarrierType"
        >
          手機條碼載具
        </RadioItem>
        <div
          v-show="carrierTypeSelected === 'carrierPhone'"
          class="carrier__inputs"
        >
          <input
            v-model="carrierInputs.carrierPhone"
            type="text"
            placeholder="如：/1234ABC"
          />
        </div>
      </div>
      <div class="carriers__carrier carrier">
        <RadioItem
          :value="'carrierNatural'"
          :value-selected="carrierTypeSelected"
          @change="changeCarrierType"
        >
          自然人憑證條碼
        </RadioItem>
        <div
          v-show="carrierTypeSelected === 'carrierNatural'"
          class="carrier__inputs"
        >
          <input
            v-model="carrierInputs.carrierNatural"
            type="text"
            placeholder="如：AB00001234567890"
          />
        </div>
      </div>
      <div class="carriers__carrier carrier">
        <RadioItem
          :value="'carrierBusiness'"
          :value-selected="carrierTypeSelected"
          @change="changeCarrierType"
        >
          三聯式發票
        </RadioItem>
        <div
          v-show="carrierTypeSelected === 'carrierBusiness'"
          class="carrier__inputs"
        >
          <input
            v-model="carrierInputs.carrierBusiness.title"
            type="text"
            placeholder="請填入您的公司抬頭"
          />
          <input
            v-model="carrierInputs.carrierBusiness.taxNumber"
            type="text"
            placeholder="請填入您的公司統一編號"
          />
          <input
            v-model="carrierInputs.carrierBusiness.address"
            type="text"
            placeholder="請填入您的發票寄送地址"
          />
        </div>
      </div>
    </div>
    <div class="donate__block donate__buttons buttons">
      <button
        :class="[
          'buttons__button',
          'button',
          { 'button--yellow': isFormValid }
        ]"
        @click="submitForm"
      >
        確認付款
      </button>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get'
import dayjs from 'dayjs'
import RadioItem from '@readr-ui/radio-item/src/readr-ui-radio-item.vue'
import { insertTappayScript } from '../util'

const debug = require('debug')('CLIENT:SidebarDonateForm')

const CARRIER_TYPE_NUM = {
  carrierEmail: '2',
  carrierPhone: '0',
  carrierNatural: '1',
  carrierBusiness: undefined
}

export default {
  components: {
    RadioItem
  },
  props: {
    isDepositing: {
      type: Boolean,
      required: true
    },
    tappayConfig: {
      type: Object,
      required: true
    },
    userProfile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      donateAmountSelected: 150,
      isDonateAmountCustom: false,
      donateAmountCustomInternal: '',

      isCardInfoValid: false,

      carrierTypeSelected: '',
      carrierInputs: {
        carrierEmail: this.userProfile.mail,
        carrierPhone: '',
        carrierNatural: '',
        carrierBusiness: {
          address: '',
          title: '',
          taxNumber: ''
        }
      },
      contactInputs: {
        contactName: this.userProfile.nickname,
        contactEmail: this.userProfile.mail
      },

      donateType: 'subscription',

      isTappayInitialized: false
    }
  },
  computed: {
    donateAmount() {
      return this.isDonateAmountCustom
        ? this.donateAmountCustom
        : this.donateAmountSelected
    },
    donateAmountCustom: {
      get() {
        return this.donateAmountCustomInternal
      },
      set(value) {
        if (value < 30) {
          this.donateAmountCustomInternal = 30
        } else if (value > 2000) {
          this.donateAmountCustomInternal = 2000
        } else {
          this.donateAmountCustomInternal = value
        }
      }
    },

    isFormValid() {
      const isDonateAmountValid =
        this.donateAmountSelected !== 0 ||
        (this.isDonateAmountCustom &&
          this.donateAmountCustomInternal >= 30 &&
          this.donateAmountCustomInternal <= 2000)
      const isPaymentMethodValid = this.isCardInfoValid
      const isCarrierValid =
        this.carrierTypeSelected !== '' &&
        this.carrierInputs[this.carrierTypeSelected] !== ''
      const isContactValid =
        this.contactInputs.contactName !== '' &&
        this.contactInputs.contactEmail !== ''

      const isCarrierBusiness = this.carrierTypeSelected === 'carrierBusiness'
      let isCarrierBusinessInfoValid = true
      if (isCarrierBusiness) {
        isCarrierBusinessInfoValid =
          this.carrierInputs.carrierBusiness.address &&
          this.carrierInputs.carrierBusiness.taxNumber &&
          this.carrierInputs.carrierBusiness.title
      }
      return (
        isDonateAmountValid &&
        isPaymentMethodValid &&
        isCarrierValid &&
        isContactValid &&
        isCarrierBusinessInfoValid
      )
    },

    // isTappayLoaded () {
    //   return get(this.$store, 'state.isTappayLoaded', false)
    // },

    carrierInfo() {
      const carrierType = CARRIER_TYPE_NUM[this.carrierTypeSelected]
      const carrierNum = get(this.carrierInputs, this.carrierTypeSelected, '')
      const category = this.carrierTypeSelected === 'carrierBusiness' ? 2 : 1
      return { carrierType, carrierNum, category }
    }
  },
  mounted() {
    !this.isTappayInitialized && this.initialTappay()
  },
  methods: {
    toggleDomateAmount(value) {
      if (value === 'custom') {
        this.isDonateAmountCustom = true
        this.donateAmountSelected = 0
      } else {
        this.isDonateAmountCustom = false
        this.donateAmountSelected = value
      }
    },

    changeCarrierType(newType) {
      this.carrierTypeSelected = newType
    },
    getPayloadSubscription(primeResult, now) {
      const invoiceCategoryMapping = {
        1: 'B2C',
        2: 'B2B',
        default: 'B2C'
      }
      const email = get(this.contactInputs, 'contactEmail', '')
      const contactName = get(this.contactInputs, 'contactName', '')
      const invoiceCategory = get(this.carrierInfo, 'category')
      const invoiceCarrierType = get(this.carrierInfo, 'carrierType')
      let requestBody = {
        amount: this.donateAmount,
        email,
        createdAt: now.toISOString(),
        paymentInfos: {
          prime: primeResult.card.prime,
          cardholder: {
            phoneNumber: get(this.contactInputs, 'contactPhone', ''),
            name: contactName,
            email
          }
        },
        invoiceInfos: {
          category:
            invoiceCategoryMapping[invoiceCategory] || invoiceCategory.default,
          buyerName: contactName,
          buyerEmail: email,
          itemPrice: [this.donateAmount],
          lastFourNum: primeResult.card.lastfour // for readr-web-api log
        }
      }
      // const memberId = get(this.$store, 'state.DataUser.profile.id')
      // if (memberId) {
      //   requestBody.memberId = memberId
      // }
      if (invoiceCarrierType === '2') {
        // Email 載具
        requestBody.invoiceInfos.buyerEmail = get(
          this.carrierInputs,
          'carrierEmail'
        )
      }
      if (this.carrierTypeSelected === 'carrierBusiness') {
        requestBody.invoiceInfos.buyerUbn = get(
          this.carrierInputs,
          'carrierBusiness.taxNumber'
        )
        requestBody.invoiceInfos.buyerName =
          get(this.carrierInputs, 'carrierBusiness.title') || contactName
        requestBody.invoiceInfos.buyerAddress = get(
          this.carrierInputs,
          'carrierBusiness.address'
        )
      }
      if (this.carrierTypeSelected !== 'carrierBusiness') {
        requestBody.invoiceInfos.carrierType = invoiceCarrierType
        requestBody.invoiceInfos.carrierNum = get(
          this.carrierInfo,
          'carrierNum'
        )
      }
      return requestBody
    },
    getPayloadOnce(primeResult) {
      const payload = {
        donateData: {
          invoiceItem: {
            businessTitle: get(this.carrierInputs, [
              'carrierBusiness',
              'title'
            ]),
            businessTaxNo: get(this.carrierInputs, [
              'carrierBusiness',
              'taxNumber'
            ]),
            businessAddress: get(this.carrierInputs, 'carrierBusiness.address'),
            carrierType: get(this.carrierInfo, 'carrierType'),
            carrierNum: get(this.carrierInfo, 'carrierNum'),
            category: get(this.carrierInfo, 'category'),
            lastFourNum: primeResult.card.lastfour
          },
          points: this.donateAmount,
          token: primeResult.card.prime,
          member_name: get(this.contactInputs, 'contactName', ''),
          member_mail: get(this.contactInputs, 'contactEmail', ''),
          member_phone: get(this.contactInputs, 'contactPhone', '')
        }
      }
      return payload
    },

    submitForm() {
      if (this.isFormValid && !this.isDepositing) {
        this.$emit('startDeposit')

        window.TPDirect.card.getPrime(result => {
          if (result.status !== 0) {
            console.error('get prime error ' + result.msg)
            this.$emit('finishDeposit')
            return
          }
          debug('get prime successfully: ' + result.card.prime)
          const submitStrategy = {
            once: this.getPayloadOnce,
            subscription: this.getPayloadSubscription
          }
          const now = new Date()
          if (submitStrategy[this.donateType]) {
            const payload = submitStrategy[this.donateType](result, now)
            const resultInfo = {
              isSubscription: this.donateType === 'subscription',
              donateAmount: this.donateAmount,
              carrierTypeSelected: this.carrierTypeSelected,
              carrierInputs: this.carrierInputs[this.carrierTypeSelected],
              date: dayjs(now).format('YYYY/MM/DD HH:mm:ss')
            }
            payload.formData = resultInfo
            this.$emit('submitForm', { type: this.donateType, payload })
          }
        })
      }
    },

    async initialTappay() {
      await insertTappayScript()
      window.TPDirect.setupSDK(
        get(this.tappayConfig, 'APP_ID', ''),
        get(this.tappayConfig, 'SECRET', ''),
        get(this.tappayConfig, 'ENV', 'sandbox')
      )
      window.TPDirect.card.setup({
        fields: {
          number: {
            element: '#card-number',
            placeholder: '**** **** **** ****'
          },
          ccv: {
            element: '#card-ccv',
            placeholder: '末三碼'
          },
          expirationDate: {
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
          }
        },
        styles: {
          input: { color: 'black', 'font-size': '16px' },
          // 'input.cvc': {},
          // 'input.expiration-date': {},
          // 'input.card-number': {},
          // ':focus': {},
          '.valid': { color: 'black' },
          '.invalid': { color: 'red' }
        }
      })
      window.TPDirect.card.onUpdate(update => {
        if (update.canGetPrime) {
          debug('no wrong data.')
          this.isCardInfoValid = true
        } else {
          this.isCardInfoValid = false
        }
        if (update.hasError) {
          debug('invalid data found.')
        }

        if (update.status.number === 2) {
          debug('invalid card number')
        } else if (update.status.number === 0) {
          debug('card number: passed.')
        } else {
          debug('wating to fill card number.')
        }

        if (update.status.expiry === 2) {
          debug('incalid expiry')
        } else if (update.status.expiry === 0) {
          debug('expiry: passed')
        } else {
          debug('watiing to fill card expiry')
        }

        if (update.status.cvc === 2) {
          debug('incalid cvc')
        } else if (update.status.cvc === 0) {
          debug('cvc: passed')
        } else {
          debug('watiing to fill card cvc')
        }
      })
      this.isTappayInitialized = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.donate
  width 440px
  margin 80px auto 0 auto
  h1
    font-size 24px
    font-weight 500
  h2
    font-weight 400
    &.bold
      font-weight 500
  &__block
    & + &
      margin 36px 0 0 0
  &__header
    position absolute
    top 0
    left 0

.header
  width 100%
  height 80px
  background-color #ddcf21
  display flex
  align-items center
  padding 0 52px 0 0
  img
    width 15%
    position absolute
    top 10px
    left 0
  &__titles
    margin-left calc((50vw - 440px) / 2)
    display flex
    p
      font-size 30px
    p + p
      margin 0 0 0 20px

.donate-amount
  &__coins
    margin 12px 0 0 0

.coins
  &__row
    display flex
    align-items center
    & + &
      margin 20px 0 0 0
  &__coin
    & + &
      margin 0 0 0 20px
  &__custom-coin-input
    margin 0

.coin
  d = 60px
  width d
  height d
  border-radius d
  border 1px solid black
  background-color white
  cursor pointer
  font-size 16px
  padding 0
  &:focus
    outline none
  &--selected
    background-color #ddcf21

.custom-coin-input
  &__top
    display flex
    align-items center
    input
      -webkit-appearance none
      border-radius 0
      box-shadow inset 0 1px 3px 0 rgba(0,0,0,0.5)
      border none
      width 409px
      height 30px
      padding 6px 10px
      font-size 16px
      &:focus
        outline none
    p
      margin 0 0 0 10px
  &__bottom
    margin 3px 0 0 0
    p
      font-size 12px

.payment-method-forms
  &__form
    margin 10px 0 0 0

.form
  &__row
    margin 10px 0 0 0
  &__contact-name, &__contact-email
    input
      -webkit-appearance none
      border-radius 0
      box-shadow inset 0 1px 3px 0 rgba(0,0,0,0.5)
      border none
      width 100%
      height 30px
      padding 6px 10px
      margin 5px 0 0 0
      font-size 16px
      &::placeholder
        font-size 16px
        color #9b9b9b
        line-height normal

.tpfield
  margin 5px 0 0 0
  height 30px
  box-shadow inset 0 1px 3px 0 rgba(0,0,0,0.5)
  border none
  padding 6px 10px
  font-size 12px

.carriers
  &__carrier
    margin 10px 0 0 0

.carrier
  &__inputs
    margin 10px 0 0 0
    padding 0 0 0 30px
    input
      -webkit-appearance none
      border-radius 0
      box-shadow inset 0 1px 3px 0 rgba(0,0,0,0.5)
      border none
      width 100%
      height 30px
      padding 6px 10px
      font-size 16px
      &::placeholder
        font-size 16px
        color #9b9b9b
        line-height normal
    input + input
      margin 10px 0 0 0

.buttons
  padding 44px 0 0 0

.button
  width 100%
  height 50px
  border-radius 8px
  background-color gray
  font-size 1.5rem
  font-weight 500
  display flex
  justify-content center
  align-items center
  &--yellow
    background-color #ddcf21

.type
  display flex
  &__radio
    flex 1
    position relative
    display flex
    justify-content center
    align-items center
    height 40px
    color #9b9b9b
    font-size 16px
    line-height 40px
    border 1px solid #9b9b9b
    cursor pointer
    & + .type__radio
      border-left none
    &.active
      color #000
      background-color #ddcf21
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5)
    > input
      margin 0
      opacity 0
      width 0
      height 0

@media (max-width 1400px)
  .donate
    width 90%
    margin 80px auto 0 auto

  .header
    display flex
    align-items center
    padding 0 42px 0 0
    img
      width auto
      height 84px
      top 5px
    &__titles
      flex-direction column
      margin 0 0 0 115px
      p
        font-size 18px
      p + p
        margin 0

@media (max-width 768px)
  .donate
    width 100%
    margin 100px 0 0 0
    &__block
      & + &
        margin 20px 0 0 0

  .header
    display flex
    align-items center
    padding 0 42px 0 0
    img
      width auto
      height 84px
      top 5px
    &__titles
      flex-direction column
      margin 0 0 0 115px
      p
        font-size 18px
      p + p
        margin 0

  .donate-amount
    &__coins
      margin 8px 0 0 0

  .coins
    &__row
      display flex
      flex-wrap wrap
      align-items center
      & + &
        margin 8px 0 0 0
    &__coin
      & + &
        margin 0 0 0 8px
      &:nth-of-type(4)
        margin-right calc(90vw - 12px * 2 - 60px * 4 - 8px * 3)
      &:nth-of-type(5)
        margin 8px 0 0 0

  .custom-coin-input
    &__top
      display flex
      align-items center
      input
        -webkit-appearance none
        border-radius 0
        box-shadow inset 0 1px 3px 0 rgba(0,0,0,0.5)
        border none
        width 150px
        height 30px
        padding 6px 10px
        font-size 16px
        &:focus
          outline none
      p
        margin 0 0 0 10px !important
    &__bottom
      margin 3px 0 0 0
      p
        font-size 12px

  .buttons
    padding 50px 0
</style>
