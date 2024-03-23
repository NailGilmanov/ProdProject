export default function Profile() {
    const name = localStorage.getItem('name');

    return (
        <main className='p-3'>
            <div className="progress-bar">
                <h3 className="text-left text-xl font-extrabold">Привет, {name}!!</h3>
                <br />
                <h2 className="text-left text-xl font-normal">Ваш рейтинг: {123}</h2>
                <h2 className="text-left text-xl font-normal">Всего превычек изучено: {123}</h2>
                <h2 className="text-left text-xl font-normal">В процессе: {123}</h2>
            </div>
        </main>
    )
}