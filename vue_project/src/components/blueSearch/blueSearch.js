Vue.component(
    'blue-search',
    {
        props: ['value'],
        template:
            `<input 
            class="blue-input" 
            v-bind:value="value" 
            v-on:input="$emit('input', $event.target.value)">`
    }
);
