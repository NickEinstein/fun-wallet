import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTopupStore = defineStore(
  'topup',
  () => {
    // Package definitions: €10 / €20 / €50 with FAN bonus
    const packages = ref([
      {
        id: 'pkg-10',
        amount: 10,
        realCredits: 10,
        bonusCredits: 10,
        bonusPercent: 100,
        badge: null,
        popular: false,
        stripeLink: 'https://buy.stripe.com/test_pkg10' // Replace with actual Stripe Payment Link
      },
      {
        id: 'pkg-20',
        amount: 20,
        realCredits: 20,
        bonusCredits: 20,
        bonusPercent: 100,
        badge: 'Most Popular',
        popular: true,
        stripeLink: 'https://buy.stripe.com/test_pkg20' // Replace with actual Stripe Payment Link
      },
      {
        id: 'pkg-50',
        amount: 50,
        realCredits: 50,
        bonusCredits: 50,
        bonusPercent: 100,
        badge: 'Best Value',
        popular: false,
        stripeLink: 'https://buy.stripe.com/test_pkg50' // Replace with actual Stripe Payment Link
      }
    ])

    // Selected package
    const selectedPackageId = ref(null)

    // Referral code (from URL param or input)
    const referralCode = ref('')

    // User ID (if logged in)
    const userId = ref(null)

    // User form data (simplified)
    const userForm = ref({
      email: '',
      consent: false
    })

    // Loading state
    const isLoading = ref(false)

    // Checkout session data
    const checkoutSession = ref(null)

    // Wallet balances (Real + FAN Bonus)
    const walletBalances = ref({
      realWallet: 0,
      bonusWallet: 0
    })

    // Transaction history
    const transactions = ref([])

    // Get selected package
    const selectedPackage = computed(() => {
      return packages.value.find((pkg) => pkg.id === selectedPackageId.value) || null
    })

    // Calculate bonus amount (FAN bonus credits)
    const bonusAmount = computed(() => {
      if (!selectedPackage.value) return 0
      return selectedPackage.value.bonusCredits
    })

    // Real credits user gets
    const realCredits = computed(() => {
      return selectedPackage.value?.realCredits || 0
    })

    // Calculate total credits (real + bonus)
    const totalCredits = computed(() => {
      if (!selectedPackage.value) return 0
      return selectedPackage.value.realCredits + selectedPackage.value.bonusCredits
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

    // Set referral code
    function setReferralCode(code) {
      referralCode.value = code
    }

    // Set user ID
    function setUserId(id) {
      userId.value = id
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
        email: '',
        consent: false
      }
      referralCode.value = ''
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

    // Update wallet balances
    function updateWalletBalances(real, bonus) {
      walletBalances.value.realWallet = real
      walletBalances.value.bonusWallet = bonus
    }

    // Add transaction to history
    function addTransaction(transaction) {
      transactions.value.unshift(transaction)
    }

    // Set transactions
    function setTransactions(txns) {
      transactions.value = txns
    }

    // Build Stripe redirect URL with metadata
    function getStripeRedirectUrl() {
      if (!selectedPackage.value) return null

      const baseUrl = selectedPackage.value.stripeLink
      const params = new URLSearchParams()

      // Add client_reference_id for user tracking
      if (userId.value) {
        params.append('client_reference_id', userId.value)
      }

      // Prefill email if provided
      if (userForm.value.email) {
        params.append('prefilled_email', userForm.value.email)
      }

      // Build final URL with params
      let finalUrl = baseUrl
      if (params.toString()) {
        finalUrl += (baseUrl.includes('?') ? '&' : '?') + params.toString()
      }

      return finalUrl
    }

    // Validate form (simplified - just need package and consent)
    const isFormValid = computed(() => {
      return selectedPackageId.value !== null && userForm.value.consent === true
    })

    // Get form errors
    const formErrors = computed(() => {
      const errors = {}
      if (!userForm.value.consent) errors.consent = 'You must agree to continue'
      if (!selectedPackageId.value) errors.package = 'Please select a package'
      return errors
    })

    return {
      // State
      packages,
      selectedPackageId,
      referralCode,
      userId,
      userForm,
      isLoading,
      checkoutSession,
      walletBalances,
      transactions,

      // Getters
      selectedPackage,
      bonusAmount,
      realCredits,
      totalCredits,
      payNowAmount,
      isFormValid,
      formErrors,

      // Actions
      selectPackage,
      selectPackageByAmount,
      setReferralCode,
      setUserId,
      updateFormField,
      resetForm,
      clearSelection,
      setLoading,
      setCheckoutSession,
      updateWalletBalances,
      addTransaction,
      setTransactions,
      getStripeRedirectUrl
    }
  },
  {
    persist: {
      key: 'topup-store',
      storage: sessionStorage,
      paths: ['selectedPackageId', 'userForm', 'referralCode', 'walletBalances', 'transactions']
    }
  }
)
