const dateArray = ['24-Apr-2024','02-May-2024','09-May-2024','31-May-2024','21-Jun-2024'];
const strategyArray = [         

{ 'View': 'Bullish', 'Value': {
        '24-Apr-2024': ['Bull Call Spread','Bull Put Spread','Bull Put Spread','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy1','Strategy1','SpreadStrategy','Bull Call Spread'],
        '02-May-2024': ['Bull Call Spread','Bull Call Spread','Bull Put Spread','Long Call','Long Call','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy2','Strategy1','Strategy2','Bull Call Spread'],
        '09-May-2024': ['Strategy Put','Strategy Call','Strategy Call','Strategy Call','Strategy Put']
    }},
    { 'View': 'Bearish', 'Value': {
        '24-Apr-2024': ['Bear Call Spread','Bear Call Spread','Bear Call Spread','Long Put','Long Put','Long Put','Bear Call Spread'],
        '31-May-2024': ['Long Put','Long Put','Long Put','Long Put','Long Put'],
        '21-Jun-2024': ['Strategy3','Strategy3','Bear Put Spread','Strategy3','Long Put','Long Put']
    }},
    { 'View': 'RangeBound', 'Value': {
        '24-Apr-2024': ['Short Straddle','Short Strangle','Short Strangle','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy1','Strategy1','SpreadStrategy','Short Straddle'],
        '02-May-2024': ['Short Straddle','Short Straddle','Short Strangle','Iron Butterfly','Iron Butterfly','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy2','Strategy1','Strategy2','Short Straddle'],
        '21-Jun-2024': ['Iron Condor','Iron Butterfly','Iron Butterfly','Iron Butterfly','Iron Condor']
    }},
    { 'View': 'Volatile', 'Value': {
        '02-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy1','Strategy1','Spread-Strategy','Long Straddle'],
        '09-May-2024': ['Long Straddle','Long Straddle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy2','Strategy1','Strategy2','Long Straddle'],
        '31-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle']
    }}
];

const date_dropdown = document.querySelector('.default_date');
const date_dropdown_list = document.querySelector('.date_dropdown_list');
date_dropdown.textContent = dateArray[0];  

dateArray.forEach(date => {
    const date_list = document.createElement('div');
    date_list.textContent = date;
    date_list.addEventListener('click', function () {
        date_dropdown.textContent = date;
        selectedDate = date;
        date_dropdown_list.classList.remove('show');
        show_strategies();
    });
    date_dropdown_list.appendChild(date_list);
});


date_dropdown.addEventListener('click', function (event) {
    event.stopPropagation(); 
    date_dropdown_list.classList.toggle('show');     
    date_dropdown.classList.toggle('open');
});


document.addEventListener('click', function (event) {
    if (!date_dropdown.contains(event.target) && !date_dropdown_list.contains(event.target)) {
        date_dropdown_list.classList.remove('show');
        date_dropdown.classList.remove('open'); 
    }
});


let selectedView = 'Bullish';
let selectedDate = dateArray[0];

document.querySelectorAll('.menu_lst').forEach(elemnt => {
    elemnt.addEventListener('click', function () {
        document.querySelectorAll('.menu_lst').forEach(btn1 => btn1.classList.remove('menu_select'));
        this.classList.add('menu_select');
        selectedView = this.getAttribute('data-view');
        show_strategies();
    });
});

function show_strategies() {
    const strategy_cls = document.querySelector('.strategy_cls');
    const empty_strategy = document.querySelector('.empty_strategy');
    document.getElementById('empty_date').textContent = selectedDate;
    strategy_cls.innerHTML = '';

    const strategy_view_data = strategyArray.find(obj1 => obj1.View === selectedView)?.Value[selectedDate] || [];

    if (strategy_view_data.length === 0) {
        empty_strategy.style.display = 'block';
    } else {
        empty_strategy.style.display = 'none';
        const strategy_Count = {};
        strategy_view_data.forEach(strategies => {
            strategy_Count[strategies] = (strategy_Count[strategies] || 0) + 1;
        });

        Object.keys(strategy_Count).forEach(strategies => {
            const strategy = document.createElement('div');
            strategy.className = 'strategy_card';
            strategy.innerHTML = `<span>${strategies}</span><span id='strategy_card_span'> <span id="bullet">•</span> ${strategy_Count[strategies]} ${strategy_Count[strategies] > 1 ? 'Strategies' : 'Strategy'}</span>`;
            strategy_cls.appendChild(strategy);
        });
    }
}

show_strategies();

