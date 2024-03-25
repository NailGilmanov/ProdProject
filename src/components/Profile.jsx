import Chart from 'react-apexcharts'

export default function Profile() {
    const name = localStorage.getItem('name');
    const actions = JSON.parse(localStorage.getItem('actions'));
    const failActions = JSON.parse(localStorage.getItem('failActions'));

    const weekActions = []
    const weekFailedActions = []
    const dayOfWeek = []

    for (let i = 0; i < 7; i += 1) {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() - i + 1);
        const dateToFilter = newDate.toISOString().slice(0, 10);
        dayOfWeek.push(dateToFilter)

        const filteredActions = actions.filter(action => action.date.slice(0, 10) === dateToFilter)
        weekActions.push(filteredActions.length)
    }

    for (let i = 0; i < 7; i += 1) {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() - i + 1);
        const dateToFilter = newDate.toISOString().slice(0, 10);

        const filteredFailActions = failActions.filter(action => action.date.slice(0, 10) === dateToFilter)
        weekFailedActions.push(filteredFailActions.length)
    }

    dayOfWeek.reverse();
    weekActions.reverse();
    weekFailedActions.reverse();

    return (
        <main className='p-3'>
            <div className="progress-bar">
                <h3 className="text-left text-xl font-extrabold">Привет, {name}!!</h3>
                <br />
                <h2 className="text-left text-xl font-normal">Всего привычек изучено: {actions.length}</h2>
                <h2 className="text-left text-xl font-normal">Пропущено привычек: {failActions.length}</h2>

                <Chart
                    className='mt-5'
                    type='bar'
                    series={[
                        {
                            name: 'Колиство выполненных привычек',
                            data: [...weekActions]
                        }
                    ]}
                    options={{
                        title: {text: 'Выполнение привычек за неделю'},
                        colors: ['#136c43'],
                        theme: {mode: 'light'},
                        xaxis: {
                            categories: [...dayOfWeek]
                        }
                    }}
                >
                </Chart>

                <Chart
                    className='mt-4'
                    type='bar'
                    series={[
                        {
                            name: 'Колиство пропущенных привычек',
                            data: [...weekFailedActions]
                        }
                    ]}
                    options={{
                        title: {text: 'Количество пропущенных привычек'},
                        colors: ['#FF0000'],
                        theme: {mode: 'light'},
                        xaxis: {
                            categories: [...dayOfWeek]
                        }
                    }}
                >
                </Chart>

                <Chart
                    className='mt-4'
                    type='pie'
                    series={[actions.length, failActions.length]}
                    options={{
                        title: {text: 'Пропущенные привычки к сделанным'},
                        colors: ['#136c43', '#FF0000'],
                        theme: {mode: 'light'},
                        labels: ['Выполнено', 'Пропущено']
                    }}
                >
                </Chart>
            </div>
        </main>
    )
}