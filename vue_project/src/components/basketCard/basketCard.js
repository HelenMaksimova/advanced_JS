Vue.component('basket-card',
    {
        template:
            `<div class="basket-card">
                <blue-button @click="$emit('view')">Закрыть</blue-button>
                <slot></slot>
            </div>`
    });
