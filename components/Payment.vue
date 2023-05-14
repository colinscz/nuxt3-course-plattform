<template>
  <Modal @close="$emit('close')">
    <div class="w-full max-w-2xl p-8 bg-slate-200 rounded-xl">
      <form>
        <h2 class="text-xl font-bold text-center">Buying {{ course.title }}</h2>
        <div class="px-8 py-6 mt-8 text-base bg-white rounded shadow-md width">
          <div class="flex items-center justify-between w-full mb-8">
            <label class="font-bold"> Email </label>
            <input
              class="w-full ml-6 text-left input focus:outline-none"
              type="email"
              autocomplete="email"
              v-model="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div id="card-element">
            <!-- Elements will create input elements here -->
          </div>
        </div>

        <button
          class="flex items-center justify-center w-full h-12 px-16 mt-4 font-sans text-lg font-bold text-black transition bg-yellow-300 rounded cursor-pointer focus:outline-none focus:shadow-outline hover:bg-yellow-200"
        >
          <div>Pay $97</div>
        </button>
      </form>
    </div>
  </Modal>
</template>

<script setup>
const course = await useCourse()
const config = useRuntimeConfig();
const stripe = ref(null);
const card = ref(null);
const email = ref('');
const processingPayment = ref(false);
const success = ref(false);

const formStyle = {
  base: {
    fontSize: '16px',
    color: '#3d4852',
    '::placeholder': {
      color: '#8795a1',
    },
  },
};
const elements = computed(() => stripe.value?.elements());
const setupStripe = () => {
  stripe.value = Stripe(config.public.stripeKey);
  if (!card.value && elements.value) {
    card.value = elements.value.create('card', {
      style: formStyle,
    });
    card.value.mount('#card-element');
  }
};

const handleSubmit = async () => {
  if (email.value === '') {
    return;
  }
  processingPayment.value = true;
  let secret;
  try {
    // Create a PaymentIntent with the order amount and currency
    const response = await $fetch(
      '/api/stripe/paymentIntent',
      {
        method: 'POST',
        body: {
          email: email.value,
        },
      }
    );
    secret = response;
  } catch (e) {
    console.log(e);
  }
  try {
    const response = await stripe.value.confirmCardPayment(
      secret,
      {
        payment_method: {
          card: card.value,
        },
        receipt_email: email.value,
      }
    );
    if (response.paymentIntent.status === 'succeeded') {
      success.value = true;
    }
  } catch (e) {
    console.log(e);
  } finally {
    processingPayment.value = false;
  }
};

useHead({
  script: [
    {
      src: 'https://js.stripe.com/v3/',
      onload: setupStripe,
    },
  ],
});
</script>
