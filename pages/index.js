import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AromaWheel from '../components/AromaWheel';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wine Aroma Wheel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AromaWheel aromas={[
          {
            name: 'Flower',
            children: [
              {
                name: 'Iris',
                color: 'yellow',
                enabled: true
              },
              {
                name: 'Jasmine',
                color: 'yellow',
                enabled: true
              }
            ]
          }, {
            name: 'Citrus',
            children: [
              {
                name: 'Lime',
                color: 'yellow',
                enabled: true
              },
              {
                name: 'Lemon',
                color: 'yellow',
                enabled: true
              }
            ]
          }, {
            name: 'Tree Fruit',
            children: [
              {
                name: 'Quince',
                color: 'orage',
                enabled: true
              },
              {
                name: 'Apple',
                color: 'orage',
                enabled: true
              },
              {
                name: 'Pear',
                color: 'orage',
                enabled: true
              }
            ]
          }, {
            name: 'Tropical Fruit',
            children: [
              {
                name: 'Pineapple',
                color: 'orange',
                enabled: true
              },
              {
                name: 'Mango',
                color: 'orange',
                enabled: true
              }
            ]
          }, {
            name: 'Red Fruit',
            children: [
              {
                name: 'Cranberry',
                color: 'red',
                enabled: true
              }
            ]
          }, {
            name: 'Black Fruit',
            children: [
              {
                name: 'Boysenberry',
                color: 'purple',
                enabled: true
              },
              {
                name: 'Black Currant',
                color: 'purple',
                enabled: true
              }
            ]
          }, {
            name: 'Dried Fruit',
            children: [
              {
                name: 'Roisin',
                color: 'pink',
                enabled: true
              },
              {
                name: 'Fig',
                color: 'pink',
                enabled: true
              }
            ]
          }, {
            name: 'Noble Rot',
            children: [
              {
                name: 'Beeswax',
                color: 'cornflowerblue',
                enabled: true
              },
              {
                name: 'Ginger',
                color: 'cornflowerblue',
                enabled: true
              },
              {
                name: 'Saffran',
                color: 'cornflowerblue',
                enabled: true
              }
            ]
          }, {
            name: 'Spice',
            children: [
              {
                name: 'White Pepper',
                color: 'lightgreen',
                enabled: true
              },
              {
                name: 'Red Pepper',
                color: 'lightgreen',
                enabled: true
              }
            ]
          }, {
            name: 'Vegetable',
            children: [
              {
                name: 'Black Tea',
                color: 'green',
                enabled: true
              },
              {
                name: 'Sun Dried Tomato',
                color: 'green',
                enabled: true
              }
            ]
          }, {
            name: 'Earth',
            children: [
              {
                name: 'Petroleum',
                color: 'yellowgreen',
                enabled: true
              },
              {
                name: 'Volcanic Rocks',
                color: 'yellowgreen',
                enabled: true
              }
            ]
          }, {
            name: 'Microbial',
            children: [
              {
                name: 'Mushroom',
                color: 'olive',
                enabled: true
              }
            ]
          }, {
            name: 'Oak Aging',
            children: [
              {
                name: 'Dill',
                color: 'lightbrown',
                enable: true
              }
            ]
          }, {
            name: 'General Aging',
            children: [
              {
                name: 'Leather',
                color: 'brown',
                enable: true
              }
            ]
          }, {
            name: 'TCA',
            children: [
              {
                name: 'Wet Dog',
                color: 'darkbrown',
                enable: true
              },
              {
                name: 'Musty Cordboard',
                color: 'darkbrown',
                enable: true
              }
            ]
          }, {
            name: 'Sulfide & Mercaptan',
            children: [
              {
                name: 'Cat Pee',
                color: 'darkorange',
                enable: true
              }
            ]
          }, {
            name: 'Brett',
            children: [
              {
                name: 'House Manure',
                color: 'darkpurple',
                enable: true
              }
            ]
          }, {
            name: 'Cook',
            children: [
              {
                name: 'Stewed Fruit',
                color: 'pink',
                enable: true
              },
              {
                name: 'Toffee',
                color: 'pink',
                enable: true
              }
            ]
          }, {
            name: 'V.A.',
            children: [
              {
                name: 'Balsamic',
                color: 'lightpurple',
                enable: true
              },
              {
                name: 'Vinegar',
                color: 'lightpurple',
                enable: true
              }
            ]
          }
        ]} />
      </main>
    </div>
  )
}
