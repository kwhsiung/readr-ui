<template>
  <div class="donate-wrapper">
    <SidebarDonateForm
      v-if="!showResult"
      :is-depositing="isDepositing"
      :tappay-config="tappayConfig"
      :user-profile="userProfile"
      @startDeposit="$emit('startDeposit')"
      @finishDeposit="$emit('finishDeposit')"
      @submitForm="onFormSubmit"
    />
    <SidebarDonateResult
      v-else
      :is-result-success="isResultSuccess"
      :form-data="formData"
      @backToForm="$emit('backToForm')"
    />
  </div>
</template>

<script>
import SidebarDonateForm from './SidebarDonateForm.vue'
import SidebarDonateResult from './SidebarDonateResult.vue'

export default {
  components: {
    SidebarDonateForm,
    SidebarDonateResult
  },
  props: {
    tappayConfig: {
      type: Object,
      required: true
    },
    userProfile: {
      type: Object,
      required: true
    },
    showResult: {
      type: Boolean,
      required: true
    },
    isDepositing: {
      type: Boolean,
      required: true
    },
    isResultSuccess: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      formData: {
        donateAmount: 0,
        carrierTypeSelected: '',
        carrierInputs: '',
        date: ''
      }
    }
  },
  methods: {
    onFormSubmit(submitInfo) {
      this.$set(this, 'formData', submitInfo.payload.formData)
      this.$emit('submitForm', submitInfo)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
