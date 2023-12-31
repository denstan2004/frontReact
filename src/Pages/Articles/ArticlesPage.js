import SideBar from "../MainPage/SideBar";
import React, {useEffect, useState} from "react";
import styles from "./ArcticlesPage.css"
import UserSideBar from "../UserPage/UserSideBar";
import refreshToken from "../../Helpers/refreshToken";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const ArcticlesPage =()=> {

    const [isAuthorized, setIsAuthorized] = useState(false);


    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const authorized = await refreshToken();
                setIsAuthorized(authorized);


            } catch (ex) {
                console.error('Error during authorization check:', ex);
            }
        };

        checkAuthorization();
    }, []);
    const articles = [
        {
            id:1,
            title: "Стрес та методи його подолання в сучасному світі",
            content: "Вступ\n" +
                "\n" +
                "У сучасному світі стрес є неухильним співмешканцем нашого щоденного життя. Від робочих турбот до особистих викликів, стрес може відігравати значну роль у нашому фізичному та психічному самопочутті. Тому важливо розуміти природу стресу та навчитися методам його подолання.\n" +
                "\n" +
                "Природа стресу\n" +
                "\n" +
                "Стрес - це реакція на будь-яке фізичне або емоційне навантаження, яке вимагає від нас адаптації або реакції. Це може бути спричинене різними факторами, такими як робочий тиск, проблеми в особистому житті, фізичне навантаження або навіть надмірне очікування від себе.\n" +
                "\n" +
                "Негативні наслідки стресу\n" +
                "\n" +
                "Постійний стрес може призвести до серйозних проблем зі здоров'ям, такими як проблеми зі сном, зниження імунітету та ризик розвитку серцевих захворювань. Крім фізичних наслідків, стрес може суттєво впливати на емоційний стан, спричиняючи тривогу та депресію.\n" +
                "\n" +
                "Методи подолання стресу\n" +
                "\n" +
                "Існує безліч методів, які допомагають подолати стрес. Вони варіюються від практик релаксації до стратегій самореґуляції емоцій. Деякі з них включають:\n" +
                "\n" +
                "Медитація та йога: Практика медитації та йоги може допомогти заспокоїти розум, зосередитися та зменшити рівень стресу.\n" +
                "\n" +
                "Фізична активність: Регулярні вправи сприяють виробленню ендорфінів, які підвищують настрій та знижують рівень стресу.\n" +
                "\n" +
                "Глибоке дихання та релаксаційні техніки: Вони сприяють заспокоєнню нервової системи та зменшенню фізіологічної відповіді на стрес.\n" +
                "\n" +
                "Висновок\n" +
                "\n" +
                "Подолання стресу - важлива складова здорового способу життя. Розуміння природи стресу та використання методів його подолання може допомогти зберегти фізичне та емоційне здоров'я в сучасному світі.",
            author: "Діана МакКензі"
        },
        {
            id:2,
            title: " Вплив соціальних мереж на психіку сучасної людини",
            content: "Сучасний світ надзвичайно пов'язаний із соціальними мережами, які стали не лише платформами для спілкування, а й візуальними вітринами нашого життя. Відображення реальності в цифровому просторі має неабиякий вплив на психіку людей.\n" +
                "\n" +
                "Створення ідеальної картини\n" +
                "\n" +
                "Соціальні мережі створюють можливість представляти себе у світлі, яке бажаєш. Це часто призводить до підсвідомого порівняння свого життя з тим, що показують інші. Нестабільність самооцінки та відчуття невдачі можуть виникати під впливом цього порівняння.\n" +
                "\n" +
                "Залежність та \"страх пропущеного\"\n" +
                "\n" +
                "Постійний доступ до безлічі інформації та життя інших може призвести до стану постійного очікування чогось нового. \"Страх пропущеного\" — це почуття, що щось цікаве відбувається, але без тебе.\n" +
                "\n" +
                "Виклик для емоційного здоров'я\n" +
                "\n" +
                "Це може мати важливий вплив на емоційне здоров'я. Тривога, стрес та невпевненість можуть виникати через порівняння, відсутність підтримки або залежність від позитивних оцінок у соцмережах.\n" +
                "\n" +
                "Роль самоконтролю\n" +
                "\n" +
                "Для збереження психічного здоров'я важливо навчитися контролювати свій час та спосіб використання соціальних мереж. Створення здорових границь із соціальними мережами, визначення часу використання, та свідоме ставлення до того, як ми сприймаємо інформацію, може виявитися корисним.\n" +
                "\n" +
                "Висновок\n" +
                "\n" +
                "Спілкування та обмін інформацією через соціальні мережі — це не тільки сучасна реальність, а й великий виклик для нашого психічного здоров'я. Розуміння впливу цих мереж на наше емоційне становище і свідоме керування цим впливом можуть стати ключем до збереження психологічного комфорту в цифровому світі.\n" +
                "\n",
            author: "Ліам Стівенсон"
        },
        // Тут можуть бути інші статті з масиву
    ];


    return(
            <div>
                {isAuthorized ? <UserSideBar /> : <SideBar />}
                <div className="events-container">
                    {articles.map(article => (
                        <Articles key={article.id} article={article} />
                    ))}
                </div>
            </div>
    )
}
const Articles= ({ article }) => {
    return (
        <div className="articles-container">
            <div className="article-card">
            <div className="article-title">
                <p>{article.title}</p>
            </div>
            <div className="article-content">
                <p>{article.content}</p>
            </div>
            <div className="article-author">
                <p>{article.author}</p>
            </div>
        </div>
        </div>

    );
};
export default ArcticlesPage;
