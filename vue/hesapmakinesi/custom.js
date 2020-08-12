var app = new Vue({

    el: '#app',
    data: {
        sayi1: null,
        sayi2: null,
        sonuc: null,
        metin: null,

        history: []
    },
    methods: {
        hesapla: function(islem){
            let historyItem = null;

            switch(islem) {
                case '+':
                    this.sonuc = parseInt(this.sayi1) + parseInt(this.sayi2);
                    historyItem = `${this.sayi1} + ${this.sayi2} = ${this.sonuc}`;
                    break;

                case '-':
                    this.sonuc = parseInt(this.sayi1) - parseInt(this.sayi2);
                    historyItem = `${this.sayi1} - ${this.sayi2} = ${this.sonuc}`;
                    break;

                case '/':
                    this.sonuc = parseInt(this.sayi1) / parseInt(this.sayi2);
                    historyItem = `${this.sayi1} / ${this.sayi2} = ${this.sonuc}`;
                    break;

                case '*':
                    this.sonuc = parseInt(this.sayi1) * parseInt(this.sayi2);
                    historyItem = `${this.sayi1} x ${this.sayi2} = ${this.sonuc}`;
                    break;

                default: this.sonuc = 0; break;
            }
            this.history.push({ id: this.history.length+1, text: historyItem });
            this.sayi1 = null;
            this.sayi2 = null;
        },

    }

});


Vue.component('history-item', {
    props: ['item'],
    template: '<li>{{ item.text }}</li>'
})
