<template>
  <button :class="classList" :type="type" @click="$emit('click')" :disabled="disabled">
    <slot> button </slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (value) => {
        return ['submit', 'reset'].includes(value)
      }
    },
    class: {
      type: String,
      default: '',
      validator: (value) => {
        return ['navbar', 'card'].includes(value)
      }
    },
    size: {
      type: String,
      default: '',
      validator: (value) => {
        return ['w100'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return [
        'base-button',
        `base-button--${this.class} `,
        `base-button--${this.size} `,
        {
          'base-button--disabled': this.disabled
        }
      ]
    }
  }
}
</script>

<style scoped>
.base-button {
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: white;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.2s ease-out;
  margin: 5px;
  font-size: 14px;
  min-height: 38px;
  padding: 8px 24px;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button--navbar {
  background: transparent;
  color: #8f989e;
}

.base-button--card {
  background-color: rgb(96, 109, 117);
  width: min-content;
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%);
}

.base-button--w100 {
  width: fit-content;
  font-size: 18px;
  margin-inline: auto;
}
</style>

