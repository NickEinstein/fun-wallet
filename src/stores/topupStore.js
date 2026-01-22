import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTopupStore = defineStore(
  'topup',
  () => {
    // Package definitions with bonus percentages
    const packages = ref([
      {
        id: 'pkg-25',
        amount: 25,
        bonusPercent: 100,
        badge: null,
        popular: false
      },
      {
        id: 'pkg-50',
        amount: 50,
        bonusPercent: 100,
        badge: 'Most Popular',
        popular: true
      },
      {
        id: 'pkg-100',
        amount: 100,
        bonusPercent: 100,
        badge: null,
        popular: false
      },
      {
        id: 'pkg-200',
        amount: 200,
        bonusPercent: 100,
        badge: null,
        popular: false
      }
    ])

    // Selected package
    const selectedPackageId = ref(null)

    // User form data
    const userForm = ref({
      name: '',
      email: '',
      country: '',
      userType: '', // 'fan' or 'creator'
      consent: false
    })

    // Loading state
    const isLoading = ref(false)

    // Checkout session data
    const checkoutSession = ref(null)

    // Get selected package
    const selectedPackage = computed(() => {
      return packages.value.find((pkg) => pkg.id === selectedPackageId.value) || null
    })

    // Calculate bonus amount
    const bonusAmount = computed(() => {
      if (!selectedPackage.value) return 0
      return (selectedPackage.value.amount * selectedPackage.value.bonusPercent) / 100
    })

    // Calculate total FUN Wallet credits
    const totalCredits = computed(() => {
      if (!selectedPackage.value) return 0
      return selectedPackage.value.amount + bonusAmount.value
    })

    // Pay now amount (what user pays)
    const payNowAmount = computed(() => {
      return selectedPackage.value?.amount || 0
    })

    // Select a package
    function selectPackage(packageId) {
      selectedPackageId.value = packageId
    }

    // Select package by amount (for URL preselect)
    function selectPackageByAmount(amount) {
      const pkg = packages.value.find((p) => p.amount === parseInt(amount))
      if (pkg) {
        selectedPackageId.value = pkg.id
      }
    }

    // Update form field
    function updateFormField(field, value) {
      if (field in userForm.value) {
        userForm.value[field] = value
      }
    }

    // Reset form
    function resetForm() {
      userForm.value = {
        name: '',
        email: '',
        country: '',
        userType: '',
        consent: false
      }
    }

    // Clear selection
    function clearSelection() {
      selectedPackageId.value = null
    }

    // Set loading state
    function setLoading(loading) {
      isLoading.value = loading
    }

    // Set checkout session
    function setCheckoutSession(session) {
      checkoutSession.value = session
    }

    // Validate form
    const isFormValid = computed(() => {
      return (
        userForm.value.name.trim() !== '' &&
        userForm.value.email.trim() !== '' &&
        userForm.value.email.includes('@') &&
        userForm.value.country.trim() !== '' &&
        userForm.value.userType !== '' &&
        userForm.value.consent === true &&
        selectedPackageId.value !== null
      )
    })

    // Get form errors
    const formErrors = computed(() => {
      const errors = {}
      if (!userForm.value.name.trim()) errors.name = 'Name is required'
      if (!userForm.value.email.trim()) errors.email = 'Email is required'
      else if (!userForm.value.email.includes('@')) errors.email = 'Invalid email format'
      if (!userForm.value.country.trim()) errors.country = 'Country is required'
      if (!userForm.value.userType) errors.userType = 'Please select user type'
      if (!userForm.value.consent) errors.consent = 'You must agree to continue'
      if (!selectedPackageId.value) errors.package = 'Please select a package'
      return errors
    })

    return {
      // State
      packages,
      selectedPackageId,
      userForm,
      isLoading,
      checkoutSession,

      // Getters
      selectedPackage,
      bonusAmount,
      totalCredits,
      payNowAmount,
      isFormValid,
      formErrors,

      // Actions
      selectPackage,
      selectPackageByAmount,
      updateFormField,
      resetForm,
      clearSelection,
      setLoading,
      setCheckoutSession
    }
  },
  {
    persist: {
      key: 'topup-store',
      storage: sessionStorage,
      paths: ['selectedPackageId', 'userForm']
    }
  }
)
