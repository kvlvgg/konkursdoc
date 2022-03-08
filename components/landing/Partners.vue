<template>
    <section id="partners-block" v-lazy:background-image="'/images/landing/partners/bg-partners.png'">
        <div class="container" :class="$style.partners">
            <Title title="Партнёры" is-white :class="$style['partners__title']" />

            <client-only>
                <splide :options="splideOptions" class="partners-slider" :class="$style['partners-slider']">
                    <splide-slide v-for="partner in partners" :key="partner.title" :class="$style['partner-slide']">
                        <div :class="$style.partner">
                            <a :href="partner.link" target="_blank" :class="$style['partner-image-wrap']">
                                <img :src="partner.img" :alt="partner.alt" />
                            </a>
                            <text-limit :class="$style['partner-content']" chars="100" :text="partner.content" />
                            <div :class="$style['partner-more-btn']" @click="openModal(partner)">Подробнее</div>
                        </div>
                    </splide-slide>
                </splide>
            </client-only>
        </div>
    </section>
</template>

<script>
import Title from '~/components/landing/local/Title.vue';
import TextLimit from '~/components/helpers/others/TextLmit.vue';
import PartnerModal from '~/components/landing/local/PartnerModal.vue';

export default {
    name: 'partners-section',
    components: { Title, TextLimit },
    data() {
        return {
            partners: [
                {
                    img: '/images/landing/partners/resource-media.png',
                    alt: 'resource-media',
                    title: 'Resource Media',
                    link: 'https://resurs-media.ru',
                    content: `
          Компания Ресурс-Медиа, основанная в 1992 году, на данный момент является одним из крупнейших широкопрофильных IT дистрибьюторов РФ.<br><br>
          Положение на рынке: <br>
            •	Один из крупнейших дистрибьюторов на рынке расходных материалов для печатной техники;
            •	21 филиал в различных городах России;
            •	В ТОП-5 специализированных IT дистрибьюторов по версии CRN;
            •	В ТОП-10 дистрибьюторов РФ по данным канала Astera.
            <br><br>
            Высокое качество продукции компании обеспеченно продажей только оригинального оборудования от ведущих IT-производителей
`,
                },
                {
                    img: '/images/landing/partners/ocs.png',
                    alt: 'ocs',
                    title: 'OCS',
                    link: 'https://www.ocs.ru',
                    content: `
            OCS работает на российском ИТ-рынке 25 лет и является ведущим российским ИТ-дистрибьютором. Все эти годы наша команда сбалансированно развивает направления вольюмной и проектной дистрибуции, наращивает технологическую базу, разрабатывает программы поддержки партнеров и адаптирует их к переменчивым реалиям и запросам рынка. Год от года OCS занимает лидирующие позиции на рынке: <br><br>
            OCS работает по всем продуктовым направлениям ИТ-рынка и рынка бытовой техники, включая компьютерную технику, телекоммуникационное, периферийное и сетевое оборудование, компоненты, СХД, инфраструктурное ПО, расходные материалы, бытовую технику, аксессуары и товары для интерактивных развлечений, всего порядка 500 линеек от ведущих мировых вендоров. <br><br>
            Региональная сеть офисов OCS по своей широте не имеет аналогов и включает 27 городов России. Мы работаем с более чем 8500 партнеров – как с розничными, так и с корпоративными реселлерами; как с крупными компаниями, так и с небольшими локальными продавцами.
          `,
                },
                {
                    img: '/images/landing/partners/treolan.png',
                    alt: 'treolan',
                    title: 'Treolan',
                    link: 'https://www.treolan.ru',
                    content: `
            Компания Treolan начала свою историю в 1990 году как подразделение дистрибуции компании ЛАНИТ. Сегодня это один из крупнейших широкопрофильных ИТ-дистрибьюторов, который сотрудничает с ведущими мировыми производителями программных и аппаратных решений. Партнерская сеть Treolan насчитывает свыше 2900 компаний, сосредоточенных в 230 городах России. <br><br>
            Treolan – это: <br>
            •	    Более 100 вендоров в продуктовом портфеле
            •	    Лучшая на рынке информационная система обслуживания (b2b-портал)
            •	    Продуманная система логистики и доставки
            •	    Офисы продаж в Москве, Екатеринбурге, Новосибирске, Самаре
            •	    Конкурентоспособные цены
            •	    Более 500 сотрудников – лучших на рынке профессионалов
            •	    Собственная демо-лаборатория, в которой на регулярной основе проводятся показы демо-оборудования для партнеров Treolan, как в offline, так и в online режиме с удаленным доступом к стенду 24х7
          `,
                },
                {
                    img: '/images/landing/partners/merlion.png',
                    alt: 'merlion',
                    title: 'Merlion',
                    link: 'https://merlion.com',
                    content: `
            Основанная в 1992 году, сегодня компания MERLION является крупнейшим широкопрофильным дистрибьютором на российском рынке. Компания успешно развивает такие сегменты дистрибуции, как: компьютерная, цифровая и бытовая техника, канцелярские принадлежности, офисная мебель, подарки для бизнеса. Кроме этого, особое внимание уделяется развитию VAD дистрибуции – как оборудования, так и программного обеспечения.<br><br>
            Репутация надежного, ответственного и опытного партнера, всегда выполняющего свои обязательства, позволила компании MERLION построить прочные отношения с большинством ведущих мировых производителей – в портфеле компании MERLION свыше 650 брендов, более 400 прямых дистрибьюторских соглашений. Партнерская сеть MERLION насчитывает более 7500 компаний во всех регионах России и странах СНГ. Офисы продаж находятся в Москве, Самаре, Санкт-Петербурге, Нижнем Новгороде, Екатеринбурге, Новосибирске, Ростове-на-Дону. <br><br>
            MERLION сегодня — это тысячи профессионалов, которые развивают национальный дистрибьюторский рынок в нескольких сегментах и делают высокотехнологичные продукты доступными для каждого жителя России.
          `,
                },
                {
                    img: '/images/landing/partners/mics.png',
                    alt: 'mics',
                    title: 'MICS',
                    link: 'https://mics.ru/ru/content/main',
                    content: `
            <b>Компания MICS</b> основана в 1991 году. В настоящее время занимается многопрофильной дистрибуцией компьютерной техники и потребительской электроники.<br> <br>
            <b>MICS</b> осуществляет дистрибуцию по следующим товарныи категориям: ноутбуки, настольные и планшетные ПК, серверы и серверное оборудование, аксессуары для ноутбуков, сумки и портфели, мониторы, ЖК и плазменные панели, телевизоры, принтеры и МФУ, сканеры, цифровые камеры, домашние кинотеатры, проекторы, Flash память, картридеры, оперативная память, жесткие диски, программное обеспечение, сетевое оборудование, устройства сотовой связи, офисное оборудование.<br><br>
            Головной офис компании расположен в Москве, а филиалы в городах Нижний Новгород, Ростов-на-Дону, Новосибирск и Санкт-Петербург.<br><br>
            Товарный каталог дистрибьютора представлен такими широко известными брендами, как: ACCO Brands, BenQ, Dell, Fujitsu, Kensington, Krez, LG Electronics, Lenovo, Neovo, NETGEAR, Nobo, Plustek, Rexel, Sam
          `,
                },
                {
                    img: '/images/landing/partners/marvel.png',
                    alt: 'marvel',
                    title: 'Marvel',
                    link: 'https://www.marvel.ru',
                    content: `
            Компания Марвел-Дистрибуция основана в 1991 году и является одним из крупнейших широкопрофильных IT-дистрибьюторов на территории России и стран СНГ. <br><br>
            В продуктовом портфеле компании более 120 всемирно известных производителей IT-оборудования. <br><br>
            Партнерская сеть насчитывает свыше 4000 компаний более чем из 200 городов России. Мы сотрудничаем со всеми ключевыми партнерами как розничного рынка (сети бытовой техники и электроники, салоны связи, независимая IT-розница, фото-розница, интернет-магазины и т.п.), так и проектного бизнеса (системные интеграторы, корпоративные реселлеры), а также развиваем нетрадиционные для IT-рынка каналы продаж. <br><br>
            Офисы компании расположены в Санкт-Петербурге, Москве и Алматы, работают представительства в Тбилиси, Бишкеке и Ташкенте.
          `,
                },
                {
                    img: '/images/landing/partners/nvprint.png',
                    alt: 'nvprint',
                    title: 'NVPRINT',
                    link: 'https://nvprint.ru',
                    content: `
            <b>Торговая марка NV PRINT</b> — один из самых популярных брендов совместимых расходных материалов для печатающей техники на территории РФ и близлежащего зарубежья.
          `,
                },
                {
                    img: '/images/landing/partners/profiline.png',
                    alt: 'profiline',
                    title: 'Profiline',
                    link: 'https://profiline.ru',
                    content: `
            Под брендом ProfiLine® представлен широчайший ассортимент совместимых расходных материалов к печатающей оргтехнике: лазерные картриджи и тонеры, струйные картриджи и чернила, фотобарабаны, чипы, зипы, матричные картриджи и ленты, заправочные комплекты, СНПЧ, ПЗК, фотобумага и чистящие средства. Сейчас это свыше 2000 наименований, высокое качество которых подтверждено Международными стандартами (ISO) 9001, 14001 и 19752.
          `,
                },
            ],

            splideOptions: {
                arrows: true,
                rewind: true,
                perPage: 3,
                gap: '20px',
                breakpoints: {
                    1002: {
                        perPage: 2,
                    },
                    768: {
                        perPage: 1,
                    },
                },
            },
        };
    },

    methods: {
        openModal(partner) {
            this.$modal().show(PartnerModal, { partner });
        },
    },
};
</script>

<style module lang="scss">
.partners {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 60px 30px 80px;
    color: $white;
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
}

.partners__title {
    width: 100%;
    margin-bottom: 70px;
}

.partners-slider {
    overflow-y: visible;
}
.partner-slide {
    padding-top: 41px;
}

.partner {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 60px 19px 20px;
    background-color: $white;
    color: $black;

    border-radius: 8px;
}

.partner-image-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    width: 186px;
    height: 82px;

    transform: translate(-50%, -50%);
    background-color: $white;
    border: 4px solid #453a79;
    border-radius: 8px;
    box-shadow: 0px 1px 18px rgba(34, 21, 65, 0.1), 0px 6px 10px rgba(34, 21, 65, 0.1),
        0px 3px 5px rgba(34, 21, 65, 0.15);

    & img {
        width: 60%;
        max-width: 82%;
        height: auto;
        max-height: 82%;
    }
}

.partner-content {
    width: 100%;
    margin-bottom: 14px;
    text-align: center;
    @include font(14, 17);
}

.partner-more-btn {
    margin-top: auto;
    color: $primary;
    text-align: center;
    &:hover {
        cursor: pointer;
    }
}
</style>

<style>
.partners-slider .splide__arrow {
    top: calc(50% - 20px);
}
</style>
