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
        <AromaWheel
          aromaGroups={[
            {
              name: 'Primary Aromas',
              color: '#CED9EA',
              labelColor: '#646A76',
              children: [
                'Flower',
                'Citrus',
                'Tree Fruit',
                'Tropical Fruit',
                'Red Fruit',
                'Black Fruit',
                'Dried Fruit',
                'Noble Rot',
                'Spice',
                'Vegetable',
                'Earth',
              ]
            },
            {
              name: 'Secondary',
              color: '#AFC1D8',
              labelColor: '#646A76',
              children: [
                'Microbial',
              ]
            },
            {
              name: 'Tertiary',
              color: '#CED9EA',
              labelColor: '#646A76',
              children: [
                'Oak Aging',
                'General Aging',
              ],
            },
            {
              name: 'Faults',
              color: '#AFC1D8',
              labelColor: '#646A76',
              children: [
                'TCA',
                'Sulfide & Mercaptan',
                'Brett',
                'Cook',
                'V.A.',
              ]
            }
          ]}
          aromas={[
            {
              name: 'Flower',
              color: '#6870BA',
              children: [
                {
                  name: 'Iris',
                  color: '#BBBDE2',
                  enabled: true
                },
                {
                  name: 'Jasmine',
                  color: '#BBBDE2',
                  enabled: true
                }
              ]
            }, {
              name: 'Citrus',
              color: '#6CC425',
              children: [
                {
                  name: 'Lime',
                  color: '#C5E2AB',
                  enabled: true
                },
                {
                  name: 'Lemon',
                  color: '#C5E2AB',
                  enabled: true
                }
              ]
            }, {
              name: 'Tree Fruit',
              color: '#FAA046',
              children: [
                {
                  name: 'Quince',
                  color: '#FBD1AA',
                  enabled: true
                },
                {
                  name: 'Apple',
                  color: '#FBD1AA',
                  enabled: true
                },
                {
                  name: 'Pear',
                  color: '#FBD1AA',
                  enabled: true
                }
              ]
            }, {
              name: 'Tropical Fruit',
              color: '#FF4C0C',
              children: [
                {
                  name: 'Pineapple',
                  color: '#FDB192',
                  enabled: true
                },
                {
                  name: 'Mango',
                  color: '#FDB192',
                  enabled: true
                }
              ]
            }, {
              name: 'Red Fruit',
              color: '#D2001C',
              children: [
                {
                  name: 'Cranberry',
                  color: '#EA9C86',
                  enabled: true
                }
              ]
            }, {
              name: 'Black Fruit',
              color: '#A30035',
              children: [
                {
                  name: 'Boysenberry',
                  color: '#EDA4A6',
                  enabled: true
                },
                {
                  name: 'Black Currant',
                  color: '#EDA4A6',
                  enabled: true
                }
              ]
            }, {
              name: 'Dried Fruit',
              color: '#D15992',
              children: [
                {
                  name: 'Roisin',
                  color: '#F1BCD2',
                  enabled: true
                },
                {
                  name: 'Fig',
                  color: '#F1BCD2',
                  enabled: true
                }
              ]
            }, {
              name: 'Noble Rot',
              color: '#0096DC',
              children: [
                {
                  name: 'Beeswax',
                  color: '#B0D1EF',
                  enabled: true
                },
                {
                  name: 'Ginger',
                  color: '#B0D1EF',
                  enabled: true
                },
                {
                  name: 'Saffran',
                  color: '#B0D1EF',
                  enabled: true
                }
              ]
            }, {
              name: 'Spice',
              color: '#00BDAD',
              children: [
                {
                  name: 'White Pepper',
                  color: '#BCE7E5',
                  enabled: true
                },
                {
                  name: 'Red Pepper',
                  color: '#BCE7E5',
                  enabled: true
                }
              ]
            }, {
              name: 'Vegetable',
              color: '#00973F',
              children: [
                {
                  name: 'Black Tea',
                  color: '#C5E6C1',
                  enabled: true
                },
                {
                  name: 'Sun Dried Tomato',
                  color: '#C5E6C1',
                  enabled: true
                }
              ]
            }, {
              name: 'Earth',
              color: '#69AA2C',
              children: [
                {
                  name: 'Petroleum',
                  color: '#D3ECB5',
                  enabled: true
                },
                {
                  name: 'Volcanic Rocks',
                  color: '#D3ECB5',
                  enabled: true
                }
              ]
            }, {
              name: 'Microbial',
              color: '#BCBF00',
              children: [
                {
                  name: 'Mushroom',
                  color: '#ECEEA9',
                  enabled: true
                }
              ]
            }, {
              name: 'Oak Aging',
              color: '#C69100',
              children: [
                {
                  name: 'Dill',
                  color: '#EBD19C',
                  enable: true
                }
              ]
            }, {
              name: 'General Aging',
              color: '#E98314',
              children: [
                {
                  name: 'Leather',
                  color: '#FECB9E',
                  enable: true
                }
              ]
            }, {
              name: 'TCA',
              color: '#C88272',
              children: [
                {
                  name: 'Wet Dog',
                  color: '#EDC8BE',
                  enable: true
                },
                {
                  name: 'Musty Cordboard',
                  color: '#EDC8BE',
                  enable: true
                }
              ]
            }, {
              name: 'Sulfide & Mercaptan',
              color: '#D6673F',
              children: [
                {
                  name: 'Cat Pee',
                  color: '#F4BEA1',
                  enable: true
                }
              ]
            }, {
              name: 'Brett',
              color: '#C24347',
              children: [
                {
                  name: 'House Manure',
                  color: '#EEB1A8',
                  enable: true
                }
              ]
            }, {
              name: 'Cook',
              color: '#C71B74',
              children: [
                {
                  name: 'Stewed Fruit',
                  color: '#EAA8BE',
                  enable: true
                },
                {
                  name: 'Toffee',
                  color: '#EAA8BE',
                  enable: true
                }
              ]
            }, {
              name: 'V.A.',
              color: '#AB43A2',
              children: [
                {
                  name: 'Balsamic',
                  color: '#DBAFD4',
                  enable: true
                },
                {
                  name: 'Vinegar',
                  color: '#DBAFD4',
                  enable: true
                }
              ]
            }
          ]}
        />
      </main>
    </div>
  )
}
