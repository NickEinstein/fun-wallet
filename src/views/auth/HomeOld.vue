<template>
  <div
    class="flex flex-col lg:flex-row w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
  >
    <div
      class="bg-[#e82264] dark:bg-gray-800 font-sans relative w-full overflow-hidden items-start md:flex hidden justify-center min-h-[300px] lg:min-h-screen lg:w-1/2 transition-colors duration-300"
    >
      <div
        class="relative z-10 text-white dark:text-gray-200 text-left p-4 sm:p-6 max-w-lg w-full flex-col gap-6 mt-20"
      >
        <!-- Generic Logo Placeholder (A stylized white checkmark/leaf icon) -->
        <svg
          class="h-10 w-10 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <img
          src="@/assets/logo-white.png"
          alt="Logo"
          class="absolute top-4 left-4 h-20 w-auto mb-12"
        />

        <p class="text-2xl sm:text-3xl lg:text-[32px] font-medium mb-6 sm:mb-10 mt-8">
          Sign up to connect with your favorite creators.
        </p>
        <!-- Call to Action Button -->
      </div>
      <!-- Background SVG Organic Shapes (Curved elements with a lighter shade for visual depth) -->
      <svg
        class="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <!-- Define a subtle gradient for the internal curves -->
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: rgba(255, 255, 255, 0.1); stop-opacity: 1" />
            <stop offset="100%" style="stop-color: rgba(255, 255, 255, 0.2); stop-opacity: 1" />
          </linearGradient>
        </defs>
        <!-- Large Curve 1 (Bottom Left Sweep) -->
        <path d="M0 800C400 700 800 650 1440 500V800H0V800Z" fill="url(#gradient1)" opacity="0.7" />
        <!-- Curve 2 (Upper Left / Mid-Screen Blob) -->
        <path
          d="M0 450C250 550 500 500 700 400L700 0H0V450Z"
          fill="url(#gradient1)"
          opacity="0.4"
        />
      </svg>
      <!-- Centered Content Block -->
    </div>
    <div
      class="bg-white dark:bg-gray-900 font-sans flex items-center flex-col gap-6 justify-center min-h-[400px] lg:min-h-screen p-2 sm:p-4 w-full lg:w-1/2 transition-colors duration-300"
    >
      <!-- Login Card Container -->
      <div
        class="w-full max-w-md p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl -2 border-[#e82264] transition-colors duration-300"
      >
        <div
          class="relative z-10 text-white dark:text-gray-200 text-left p-4 sm:p-6 max-w-lg w-full flex md:hidden flex-col"
        >
          <!-- Generic Logo Placeholder (A stylized white checkmark/leaf icon) -->
          <svg
            class="h-10 w-10 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <img src="@/assets/logo.png" alt="Logo" class="absolute top-4 left-4 h-20 w-auto mb-12" />

          <p
            class="text-2xl sm:text-3xl lg:text-[32px] font-medium mb-6 sm:mb-10 text-black dark:text-white"
          >
            Sign up to connect with your favorite creators.
          </p>
          <!-- Call to Action Button -->
        </div>

        <!-- OTP Verification Section -->
        <div v-if="showOTP">
          <!-- Back Button -->
          <button
            @click="backToSignup"
            class="flex items-center gap-2 text-[#e82264] hover:text-pink-700 mb-4 transition"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span class="font-semibold">Back to Sign Up</span>
          </button>

          <h1
            class="text-2xl sm:text-3xl font-extrabold text-[#e82264] mb-2 tracking-tight text-center"
          >
            Verify Your Account
          </h1>
          <p class="text-gray-600 text-center mb-6">
            Enter the 6-digit code sent to {{ userEmail }}
          </p>

          <div
            v-if="errorMessage"
            class="mb-4 text-center text-sm text-[#e82264] font-semibold bg-[#fbe9f2] border border-[#e82264] rounded-lg py-2 px-4"
          >
            {{ errorMessage }}
          </div>

          <!-- OTP Input Fields -->
          <div class="flex justify-center gap-2 mb-6">
            <input
              v-for="(digit, index) in otpDigits"
              :key="index"
              :ref="(el) => (otpInputs[index] = el)"
              type="text"
              maxlength="1"
              v-model="otpDigits[index]"
              @input="handleOTPInput(index, $event)"
              @keydown="handleOTPKeydown(index, $event)"
              class="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] transition"
            />
          </div>

          <!-- Verify Button -->
          <button
            @click="handleVerifyOTP"
            :disabled="isLoading || otpDigits.some((d) => !d)"
            class="w-full bg-[#e82264] text-white font-bold py-3 rounded-xl transition duration-300 hover:bg-[#e82264]/80 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#e82264]/50 shadow-md text-lg tracking-wide"
          >
            <span v-if="isLoading" class="loader mr-2 align-middle"></span>
            <span v-else>VERIFY CODE</span>
          </button>

          <!-- Resend Code -->
          <div class="text-center mt-4">
            <button
              @click="handleResendOTP"
              class="text-sm text-gray-600 hover:text-[#e82264] transition"
            >
              Didn't receive the code? <span class="text-[#e82264] font-semibold">Resend</span>
            </button>
          </div>
        </div>

        <!-- Login/Signup Forms (shown when not in OTP view) -->
        <div v-else>
          <h1
            class="text-2xl sm:text-3xl font-extrabold text-[#e82264] mb-4 tracking-tight text-center"
          >
            {{ isSignup ? 'Create your account' : 'Log in' }}
          </h1>
          <form v-if="!isSignup" @submit.prevent="handleLogin">
            <div
              v-if="errorMessage"
              class="mb-4 text-center text-sm text-[#e82264] font-semibold bg-[#fbe9f2] border border-[#e82264] rounded-lg py-2 px-4"
            >
              {{ errorMessage }}
            </div>
            <!-- Email Input Field -->
            <div class="mb-4">
              <div class="relative">
                <input
                  type="email"
                  id="email"
                  v-model="payload.email"
                  placeholder="Email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] transition duration-200 shadow-custom-light"
                  required
                />
              </div>
            </div>
            <!-- Password Input Field with Toggle Button -->
            <div class="mb-6">
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="payload.password"
                  placeholder="Password"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] transition duration-200 shadow-custom-light pr-10"
                  required
                />
                <!-- Password Visibility Toggle Button (SVG Eye Icon) -->
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#e82264] hover:text-pink-700 transition duration-150"
                >
                  <svg
                    v-if="!showPassword"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.045 10.045 0 0112 19c-4.477 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .473 0 .934.05 1.385.15"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12c-1.274 4.057-5.064 7-9.542 7-1.789 0-3.483-.437-4.98-1.215M17.5 17.5l-6-6"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <!-- Log In Button -->
            <button
              type="submit"
              class="w-full bg-[#e82264] text-white font-bold py-3 rounded-xl transition duration-300 hover:bg-[#e82264]/80 bg-[#e82264] focus:outline-none focus:ring-4 focus:ring-[#e82264]/50 shadow-md text-lg tracking-wide"
            >
              <span v-if="isLoading" class="loader mr-2 align-middle"></span>
              <span v-else>LOG IN</span>
            </button>
          </form>
          <form v-else @submit.prevent="handleSignup">
            <!-- Name Input Field -->
            <div
              v-if="errorMessage"
              class="mb-4 text-center text-sm text-[#e82264] font-semibold bg-[#fbe9f2] border border-[#e82264] rounded-lg py-2 px-4"
            >
              {{ errorMessage }}
            </div>
            <div class="mb-4">
              <div class="relative">
                <input
                  type="text"
                  id="name"
                  v-model="signupPayload.name"
                  placeholder="Name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] transition duration-200 shadow-custom-light"
                  required
                />
              </div>
            </div>
            <!-- Email Input Field -->
            <div class="mb-4">
              <div class="relative">
                <input
                  type="email"
                  id="signup-email"
                  v-model="signupPayload.email"
                  placeholder="Email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] transition duration-200 shadow-custom-light"
                  required
                />
              </div>
            </div>
            <!-- Password Input Field with Toggle Button -->
            <div class="mb-4">
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="signup-password"
                  v-model="signupPayload.password"
                  placeholder="Password"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] transition duration-200 shadow-custom-light pr-10"
                  required
                />
                <!-- Password Visibility Toggle Button (SVG Eye Icon) -->
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#e82264] hover:text-pink-700 transition duration-150"
                >
                  <svg
                    v-if="!showPassword"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.045 10.045 0 0112 19c-4.477 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .473 0 .934.05 1.385.15"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12c-1.274 4.057-5.064 7-9.542 7-1.789 0-3.483-.437-4.98-1.215M17.5 17.5l-6-6"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <!-- Country Input Field -->
            <CountrySelect
              :countries="countries"
              v-model="selectedCountry"
              @select="onCountrySelect"
            />
            <!-- Phone Number Input Field -->
            <div class="my-4">
              <div class="relative">
                <input
                  type="text"
                  id="signup-phone"
                  v-model="signupPayload.phoneNumber"
                  placeholder="Phone Number"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] transition duration-200 shadow-custom-light"
                  required
                />
              </div>
            </div>
            <!-- Role Input Field -->
            <div class="mb-6">
              <div class="relative">
                <select
                  id="signup-role"
                  v-model="signupPayload.role"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e82264] focus:border-[#e82264] transition duration-200 shadow-custom-light"
                  required
                >
                  <option value="creator">Creator</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
            <!-- Sign Up Button -->
            <button
              type="submit"
              class="w-full bg-[#e82264] text-white font-bold py-3 rounded-xl transition duration-300 hover:bg-[#e82264]/80 bg-[#e82264] focus:outline-none focus:ring-4 focus:ring-[#e82264]/50 shadow-md text-lg tracking-wide"
            >
              <span v-if="isLoading" class="loader mr-2 align-middle"></span>
              <span v-else>SIGN UP</span>
            </button>
          </form>
          <!-- Terms, Privacy, and Age Disclaimer -->
          <p class="text-xs text-gray-500 text-center mt-3 mb-4 leading-relaxed">
            By logging in and using this app, you agree to our
            <router-link
              to="/terms-of-service"
              class="text-[#e82264] hover:text-pink-700 font-medium underline"
              >Terms of Service</router-link
            >
            and
            <router-link
              to="/privacy-policy"
              class="text-[#e82264] hover:text-pink-700 font-medium underline"
              >Privacy Policy</router-link
            >, and confirm that you are at least
            <span class="font-bold text-[#e82264]">18 years old</span>.
          </p>
          <!-- Links Section -->
          <div class="flex justify-center text-sm space-x-4">
            <button
              v-if="!isSignup"
              @click="showForgotPassword = true"
              class="text-[#e82264] hover:underline focus:outline-none bg-transparent border-none p-0"
            >
              Forgot password?
            </button>
            <ForgotPasswordModal v-if="showForgotPassword" @close="showForgotPassword = false" />
            <span class="text-gray-400">·</span>
            <button
              v-if="!isSignup"
              @click="handleSignupClick"
              class="text-[#e82264] hover:underline focus:outline-none bg-transparent border-none p-0"
            >
              Sign up FansNgage
            </button>
            <button
              v-else
              @click="handleLoginClick"
              class="hover:underline focus:outline-none bg-transparent border-none p-0"
            >
              Already have an account? <span class="text-[#e82264]">Login</span>
            </button>
          </div>
          <div class="mt-8 text-center">
            <router-link
              to="/help"
              class="text-[#e82264] underline font-semibold hover:text-pink-700 transition"
            >
              Help Center / FAQ
            </router-link>
          </div>
        </div>
      </div>

      <div class="space-y-4 border-2-gray-200 w-full max-w-md -m-6 pb-10 mt-2">
        <!-- Sign in with X -->
        <button
          class="w-full flex relative items-center justify-center space-x-2 bg-primary-blue text-white py-3 text-[14px] rounded-full font-bold bg-blue-600 transition duration-150"
        >
          <!-- X/Twitter SVG Icon -->
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="h-5 w-5 absolute left-3 top-3 bottom-0"
            fill="currentColor"
          >
            <g>
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.22-8.26L1.5 2.25h3.308l5.98 7.826L14.46 2.25zM17.43 20.75h2.532L7.618 3.25H4.99L17.43 20.75z"
              ></path>
            </g>
          </svg>
          <span>SIGN IN WITH X</span>
        </button>

        <!-- Sign in with Google -->
        <button
          class="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 text-[14px] rounded-full font-bold transition duration-150 relative"
        >
          <!-- Google Icon: Styled as a colored icon on the left of the button -->
          <div class="absolute left-0 top-0 bottom-0 flex items-center rounded-full p-2 h-full">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.016c0-.756-.067-1.488-.195-2.196H12v4.156h5.816c-.256 1.156-.988 2.13-1.996 2.796v3.25h4.194c2.45-2.25 3.844-5.556 3.844-9.016z"
                fill="#4285F4"
              />
              <path
                d="M12 22c3.248 0 5.968-1.07 7.954-2.887l-4.195-3.25c-1.16.776-2.652 1.237-4.159 1.237-3.193 0-5.895-2.15-6.85-5.01H1.05v3.35c2.05 4.07 6.34 6.848 10.95 6.848z"
                fill="#34A853"
              />
              <path
                d="M5.15 14.15c-.244-.776-.38-1.603-.38-2.5 0-.897.136-1.724.38-2.5V5.72H1.05c-.886 1.766-1.35 3.79-1.35 5.78 0 1.99.464 4.014 1.35 5.78l4.1-3.33z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.016c1.78 0 3.395.61 4.654 1.838l3.6-3.486C17.96 1.63 15.176.016 12 .016 7.35 0 3.06 2.778 1.05 6.848l4.1 3.33c.954-2.86 3.657-5.012 6.85-5.012z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <!-- Adding padding to push the text past the icon area -->
          <span class="pl-10">SIGN IN WITH GOOGLE</span>
        </button>

        <!-- Passwordless Sign In -->
        <button
          class="w-full relative flex items-center justify-center space-x-2 bg-primary-blue text-white py-3 text-[14px] rounded-full font-bold bg-blue-600 transition duration-150"
        >
          <!-- Fingerprint SVG Icon -->
          <svg
            class="absolute left-0 top-0 bottom-0 h-6 w-6 m-3"
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M9.52844 13.782C9.77949 11.6442 10.3129 10.0455 11.873 10.0455C13.4331 10.0455 14.3852 11.2321 14.3852 13.2429C14.3852 15.2537 13.5186 18.5914 12.7945 20.6378"
                stroke="#ffffff"
                stroke-width="1.36423"
                stroke-linecap="round"
              ></path>
              <path
                d="M11.9685 12.9446C11.827 14.7257 11.3316 18.5498 10.4823 19.5972"
                stroke="#ffffff"
                stroke-width="1.36423"
                stroke-linecap="round"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.12592 18.9907C5.46505 19.3118 5.82676 19.6092 6.20842 19.8805C6.3087 19.6818 6.40785 19.4751 6.50469 19.2629C7.01745 18.139 7.50632 16.7685 7.78622 15.402C7.86181 15.0329 7.62391 14.6724 7.25485 14.5968C6.88579 14.5213 6.52533 14.7592 6.44974 15.1282C6.19442 16.3747 5.7426 17.6466 5.26353 18.6966C5.21752 18.7975 5.17159 18.8955 5.12592 18.9907Z"
                fill="#ffffff"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.90918 20.3354C7.29946 20.5662 7.70687 20.7711 8.12903 20.9478C8.27973 20.6231 8.43106 20.2744 8.57856 19.918C9.06483 18.7432 9.52512 17.447 9.80209 16.5708C9.91564 16.2116 9.71649 15.8283 9.35729 15.7148C8.99809 15.6012 8.61485 15.8004 8.50131 16.1596C8.23536 17.0009 7.78833 18.2601 7.31804 19.3963C7.18112 19.7271 7.04356 20.0442 6.90918 20.3354Z"
                fill="#ffffff"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.54584 17.0685C3.82113 17.5045 4.12933 17.9176 4.46695 18.3043C4.96213 17.3178 5.39149 16.2668 5.51279 15.4477C5.56798 15.0751 5.31062 14.7282 4.93796 14.6731C4.56531 14.6179 4.21847 14.8752 4.16328 15.2479C4.09288 15.7233 3.86302 16.3687 3.54584 17.0685Z"
                fill="#ffffff"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.7172 20.9852C15.8137 20.642 15.9133 20.2944 16.0139 19.9433L16.0139 19.9433L16.0139 19.9432C16.1658 19.413 16.32 18.8748 16.4695 18.3316C16.9933 16.4285 17.457 14.4703 17.457 12.7699C17.457 11.052 16.9837 9.51827 16.0382 8.40188C15.0816 7.27242 13.6916 6.63087 12.0001 6.63087C10.2913 6.63087 8.90442 7.33127 7.95699 8.47646C7.02036 9.6086 6.54321 11.1359 6.54321 12.7699C6.54321 13.1466 6.84861 13.452 7.22533 13.452C7.60205 13.452 7.90744 13.1466 7.90744 12.7699C7.90744 11.3901 8.3108 10.189 9.00813 9.34608C9.69465 8.51625 10.6952 7.99509 12.0001 7.99509C13.3224 7.99509 14.3198 8.4837 14.9972 9.28355C15.6856 10.0965 16.0928 11.2912 16.0928 12.7699C16.0928 14.266 15.6787 16.0635 15.1542 17.9696C15.0143 18.4778 14.8662 18.9947 14.7178 19.513C14.5299 20.1686 14.3415 20.8263 14.1683 21.4713C14.7021 21.3509 15.2197 21.1876 15.7172 20.9852Z"
                fill="#ffffff"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.7882 19.0123C19.3688 17.2737 19.8048 15.3433 19.8048 13.4598C19.8048 10.6132 19.1919 8.25076 17.8716 6.5872C16.5308 4.89771 14.5365 4.02433 12.0001 4.02433C9.43626 4.02433 7.4904 5.01782 6.20559 6.70938C4.94072 8.3747 4.36731 10.6475 4.36731 13.1449C4.36731 13.5216 4.6727 13.827 5.04942 13.827C5.42614 13.827 5.73154 13.5216 5.73154 13.1449C5.73154 10.8324 6.2655 8.88598 7.29198 7.53454C8.29852 6.20934 9.828 5.38855 12.0001 5.38855C14.1996 5.38855 15.7666 6.12935 16.8031 7.43528C17.8601 8.76713 18.4406 10.7813 18.4406 13.4598C18.4406 15.8465 17.6551 18.3895 16.7757 20.4797C17.5079 20.0752 18.1836 19.5811 18.7882 19.0123Z"
                fill="#ffffff"
              ></path>
              <path
                d="M2.98769 14.4844C2.55114 12.9601 2.50834 11.35 2.86329 9.80462C3.21825 8.25928 3.95936 6.82921 5.01731 5.64819"
                stroke="#ffffff"
                stroke-width="1.36423"
                stroke-linecap="round"
              ></path>
              <path
                d="M7.43616 3.71466C8.95012 2.87086 10.6684 2.46328 12.4 2.53722C14.1317 2.61116 15.8089 3.16371 17.2455 4.1335"
                stroke="#ffffff"
                stroke-width="1.36423"
                stroke-linecap="round"
              ></path>
              <path
                d="M19.5546 6.35229C20.463 7.58862 21.0541 9.02899 21.276 10.547C21.498 12.0651 21.344 13.6144 20.8275 15.059"
                stroke="#ffffff"
                stroke-width="1.36423"
                stroke-linecap="round"
              ></path>
            </g>
          </svg>
          <span>PASSWORDLESS SIGN IN</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Example usage for creating a user
// import { post } from '@/api-services/fetch'
// import paths from '@/api-services/endpoints'

// import { post } from '@/api-services/fetch'
// import { reactive, ref } from 'vue'
// import { useRouter } from 'vue-router'
// import logo from '@/assets/logo.png'
// import ForgotPasswordModal from './ForgotPassword.vue'
import { post, get } from '@/api-services/fetch'
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
// import logo from '@/assets/logo.png'
import ForgotPasswordModal from './ForgotPassword.vue'
import CountrySelect from '@/components/CountrySelect.vue'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const isSignup = ref(false)
const showForgotPassword = ref(false)

// OTP State
const showOTP = ref(false)
const userEmail = ref('')
const otpDigits = ref(['', '', '', '', '', ''])
const otpInputs = ref([])

const countries = ref([])
const selectedCountry = ref(null)

const payload = reactive({
  email: '',
  password: ''
})

const signupPayload = reactive({
  name: '',
  email: '',
  password: '',
  country: null,
  phoneNumber: '',
  role: 'creator'
})

const isLoading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const fetchCountries = async () => {
  try {
    const res = await get({ endpoint: 'getCountries', auth: false })
    countries.value = res?.data?.data || []
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}

const onCountrySelect = (country) => {
  selectedCountry.value = country.id
  // selectedCountry.value = country
  signupPayload.country = country.id
}

onMounted(() => {
  fetchCountries()

  // Check for OTP view
  if (route.query.view === 'otp') {
    showOTP.value = true
    // Retrieve email from localStorage
    userEmail.value = localStorage.getItem('otpEmail') || ''
  }
})

// Watch for query changes
watch(
  () => route.query.view,
  (newView) => {
    if (newView === 'otp') {
      showOTP.value = true
      // Retrieve email from localStorage
      userEmail.value = localStorage.getItem('otpEmail') || ''
    } else {
      showOTP.value = false
    }
  }
)

// Watch for page query changes
watch(
  () => route.query.page,
  (newPage) => {
    if (newPage === 'signup') {
      isSignup.value = true
    } else if (newPage === 'login') {
      isSignup.value = false
    }
  },
  { immediate: true }
)

// OTP Functions
const handleOTPInput = (index, event) => {
  const value = event.target.value

  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    otpDigits.value[index] = ''
    return
  }

  otpDigits.value[index] = value

  // Auto-focus next input
  if (value && index < 5) {
    otpInputs.value[index + 1]?.focus()
  }
}

const handleOTPKeydown = (index, event) => {
  // Handle backspace
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }

  // Handle left/right arrow keys
  if (event.key === 'ArrowLeft' && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
  if (event.key === 'ArrowRight' && index < 5) {
    otpInputs.value[index + 1]?.focus()
  }
}

const handleVerifyOTP = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const otpCode = otpDigits.value.join('')

  const response = await post({
    endpoint: '/otp/verify',
    body: {
      type: 'verification',
      otp: otpCode
    },
    auth: false
  })

  if (response?.data?.success) {
    // OTP verified successfully, redirect to login
    router.push({ path: '', query: {} })
    isSignup.value = false
    showOTP.value = false
    // Show success message
    errorMessage.value = ''
  } else {
    errorMessage.value = response?.data?.message || 'Invalid OTP code'
  }

  isLoading.value = false
}

const handleResendOTP = async () => {
  errorMessage.value = ''

  const response = await post({
    endpoint: '/otp/resend',
    body: {
      email: userEmail.value,
      purpose: 'verification'
    },
    auth: false
  })

  if (response?.data?.success) {
    // Clear OTP inputs
    otpDigits.value = ['', '', '', '', '', '']
    otpInputs.value[0]?.focus()
    errorMessage.value = ''
  } else {
    errorMessage.value = response?.data?.message || 'Failed to resend OTP'
  }
}

const backToSignup = () => {
  router.push({ path: '/', query: {} })
  showOTP.value = false
  isSignup.value = true
}

const handleSignupClick = () => {
  isSignup.value = true
  errorMessage.value = ''
  router.push({ path: '/', query: { page: 'signup' } })
}

const handleLoginClick = () => {
  isSignup.value = false
  errorMessage.value = ''
  router.push({ path: '/', query: { page: 'login' } })
}

// const createUser = async () => {
//   const userPayload = {
//     name: 'Orutu Akposieyefa Williams',
//     email: 'orutu1@gmail.com',
//     password: 'Password@!',
//     country: 1,
//     phoneNumber: '+2348100788859',
//     role: 'creator'
//   }
//   const response = await post({ endpoint: 'createUser', body: userPayload, auth: false })
//   console.log('User creation response:', response)
// }

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  // Use static payload for demo
  // const payload = {
  //   email: '',
  //   password: ''
  // }
  const response = await post({
    endpoint: 'login',
    body: payload,
    auth: false
  })

  if (response?.data?.success) {
    // Use Pinia store to persist user data
    userStore.login(response.data.user, response.data.token)
    localStorage.setItem('token', response.data.token)

    router.push('/dashboard')
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    errorMessage.value = response?.data?.message || 'Login failed'
  }
  isLoading.value = false
}

const handleSignup = async () => {
  isLoading.value = true
  errorMessage.value = ''
  const response = await post({ endpoint: 'createUser', body: signupPayload, auth: false })
  console.log('Signup response:', response)
  if (response?.data?.success) {
    // Store email in localStorage for OTP view
    localStorage.setItem('otpEmail', signupPayload.email)
    userEmail.value = signupPayload.email
    router.push({
      path: '',
      query: {
        view: 'otp'
      }
    })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    errorMessage.value = response?.data?.message || 'Signup failed'
  }
  isLoading.value = false
}
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #747cda;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  vertical-align: middle;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
