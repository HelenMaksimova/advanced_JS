Vue.component(
    'blue-button',
    {
        template: `<button class="blue-button" @click="$emit('click', $event.target.click)">
                      <slot></slot>
                  </button>`
    }
);
