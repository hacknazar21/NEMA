
export class Vote {
    constructor(el) {
        this.points = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12]
        this.cat = el.dataset.vote
        this.avaliableLabel = el.querySelector('[data-avl] span')
        this.cards = el.querySelectorAll('[data-cards] > div')
    }

    get sumAll() {
        let allPoints = 0;
        let scored = 0;
        for (const point of this.points) {
            allPoints += point
        }
        for (const card of this.cards) {
            scored += parseInt(card.querySelector('[data-score]').dataset.score)
        }
        return allPoints - scored
    }

    init() {
        for (const card of this.cards) {
            card.querySelector('[data-score]').dataset.score = 0
            if (window.innerWidth < 768) {
                card.addEventListener('mouseenter', (event) => {
                    card.classList.add('hover')
                })
                card.addEventListener('mouseleave', (event) => {
                    card.classList.remove('hover')
                })
            }
            const score = card.querySelector('[data-score]')
            const openNums = card.querySelector('[data-open-nums]')
            const Nums = card.querySelectorAll('.card-hover-nums__num')
            for (const Num of Nums) {
                Num.addEventListener('click', (event)=>{
                    if(!Num.classList.contains('avl')) {
                        
                        for (const Num of Nums) {
                            Num.classList.contains('clicked') ? Num.classList.remove('clicked') : null;
                        }
                        Num.classList.add('clicked');
                        score.innerText = Num.innerText
                        score.dataset.score = Num.innerText
                        this.avaliableLabel.innerText = this.sumAll
                    }
                })
            }
            const currentCard = card
            openNums.addEventListener('click', (event)=>{
                for (const Num of Nums) {
                    Num.classList.contains('avl') ? Num.classList.remove('avl') : null;
                }
                for (const card of this.cards) {
                    if(currentCard != card){
                        const score = card.querySelector('[data-score]')
                        if(score.innerText != '0'){
                            for (const Num of Nums) {
                                if(Num.innerText == score.innerText){
                                    Num.classList.add('avl');
                                }
                            }
                        }
                    }
                    const hoverNums = card.querySelector('.card-hover-nums')
                    const hover = card.querySelector('.card-hover')
                    hoverNums.classList.contains('show') ? hoverNums.classList.remove('show') : null;
                    hover.classList.contains('hide') ? hover.classList.remove('hide') : null;
                }
                const hoverNums = card.querySelector('.card-hover-nums')
                hoverNums.classList.add('show')
                const hover = card.querySelector('.card-hover')
                hover.classList.add('hide')
            })
            
        }
        
        this.avaliableLabel.innerText = this.sumAll
        const submitBtn = document.querySelector('button[data-submit]')
        if(submitBtn){
            submitBtn.addEventListener('click', (event)=>{
                if(this.avaliableLabel.innerText == '0'){
                    this.toDB().then((data)=>{
                        window.location.href = window.location.origin

                    })
                }
            })
        }
    }
    async toDB(){
        const data = []
        data.push(`action=vote`)
        for (const card of this.cards) {
            const memb = card.querySelector('[data-memb]').dataset.memb
            const score = card.querySelector('[data-score]').innerText
            data.push(
                `${memb}=${score}`
            )
        }
        data.push(`category=${this.cat}`)
        
        const resp = await fetch(true_obj.ajaxurl, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: data.join('&')
        })
        const responseData = resp.json()
        return responseData
    }
    
    plus(currentCard, currentScore) {
        for (const card of this.cards) {
            if (card !== currentCard) {
                if (card.querySelector('[data-score]').dataset.score == currentScore)
                    return false
            }
        }
        return true
    }
}