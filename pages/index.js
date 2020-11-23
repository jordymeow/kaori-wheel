import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AromaWheel from '../components/AromaWheel';
import { LabelTypes } from '../components/Label';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wine Aroma Wheel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AromaWheel
          onSelect={() => {
            console.log("select");
          }}
          aromaGroups={[
            {
              name: 'Primary Aromas',
              color: '#CED9EA',
              labelColor: '#646A76',
              labelType: LabelTypes.along,
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
              labelSize: 'x-small',
              children: [
                'Microbial',
              ]
            },
            {
              name: 'Tertiary',
              color: '#CED9EA',
              labelColor: '#646A76',
              labelSize: 'x-small',
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
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Iris',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  selected: true,
                  enabled: true
                },
                {
                  name: 'Peony',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                },
                {
                  name: 'Elderflower',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                },
                {
                  name: 'Acacia',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                },
                {
                  name: 'Liloc',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                },
                {
                  name: 'Jasmine',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                },
                {
                  name: 'Honeysuckle',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                },
                {
                  name: 'Violet',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                },
                {
                  name: 'Lavender',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                },
                {
                  name: 'Rose',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                },
                {
                  name: 'Potpourri',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                },
                {
                  name: 'Hibiscus',
                  color: '#BBBDE2',
                  labelColor: '#6870BA',
                  enabled: true
                }
              ]
            }, {
              name: 'Citrus',
              color: '#6CC425',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Lime',
                  color: '#C5E2AB',
                  labelColor: '#6CC425',
                  enabled: true
                },
                {
                  name: 'Lemon',
                  color: '#C5E2AB',
                  labelColor: '#6CC425',
                  enabled: true
                },
                {
                  name: 'Grapefruit',
                  color: '#C5E2AB',
                  labelColor: '#6CC425',
                  enabled: true
                },
                {
                  name: 'Orange',
                  color: '#C5E2AB',
                  labelColor: '#6CC425',
                  enabled: true
                },
                {
                  name: 'Marmolade',
                  color: '#C5E2AB',
                  labelColor: '#6CC425',
                  enabled: true
                }
              ]
            }, {
              name: 'Tree Fruit',
              color: '#FAA046',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Quince',
                  color: '#FBD1AA',
                  labelColor: '#FAA046',
                  enabled: true
                },
                {
                  name: 'Apple',
                  color: '#FBD1AA',
                  labelColor: '#FAA046',
                  enabled: true
                },
                {
                  name: 'Pear',
                  color: '#FBD1AA',
                  labelColor: '#FAA046',
                  enabled: true
                },
                {
                  name: 'Nectarine',
                  color: '#FBD1AA',
                  labelColor: '#FAA046',
                  enabled: true
                },
                {
                  name: 'Peach',
                  color: '#FBD1AA',
                  labelColor: '#FAA046',
                  enabled: true
                },
                {
                  name: 'Apricot',
                  color: '#FBD1AA',
                  labelColor: '#FAA046',
                  enabled: true
                },
                {
                  name: 'Persimmon',
                  color: '#FBD1AA',
                  labelColor: '#FAA046',
                  enabled: true
                },
              ]
            }, {
              name: 'Tropical Fruit',
              color: '#FF4C0C',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Pineapple',
                  color: '#FDB192',
                  labelColor: '#FF4C0C',
                  enabled: true
                },
                {
                  name: 'Mango',
                  color: '#FDB192',
                  labelColor: '#FF4C0C',
                  enabled: true
                },
                {
                  name: 'Guava',
                  color: '#FDB192',
                  labelColor: '#FF4C0C',
                  enabled: true
                },
                {
                  name: 'Kiwi',
                  color: '#FDB192',
                  labelColor: '#FF4C0C',
                  enabled: true
                },
                {
                  name: 'Lychee',
                  color: '#FDB192',
                  labelColor: '#FF4C0C',
                  enabled: true
                },
                {
                  name: 'Bubblegum',
                  color: '#FDB192',
                  labelColor: '#FF4C0C',
                  enabled: true
                },
              ]
            }, {
              name: 'Red Fruit',
              color: '#D2001C',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Cranberry',
                  color: '#EA9C86',
                  labelColor: '#D2001C',
                  enabled: true
                },
                {
                  name: 'Red Plum',
                  color: '#EA9C86',
                  labelColor: '#D2001C',
                  enabled: true
                },
                {
                  name: 'Pomegranate',
                  color: '#EA9C86',
                  labelColor: '#D2001C',
                  enabled: true
                },
                {
                  name: 'Sour cherry',
                  color: '#EA9C86',
                  labelColor: '#D2001C',
                  enabled: true
                },
                {
                  name: 'Strawberry',
                  color: '#EA9C86',
                  labelColor: '#D2001C',
                  enabled: true
                },
                {
                  name: 'Cherry',
                  color: '#EA9C86',
                  labelColor: '#D2001C',
                  enabled: true
                },
                {
                  name: 'Raspberry',
                  color: '#EA9C86',
                  labelColor: '#D2001C',
                  enabled: true
                },
              ]
            }, {
              name: 'Black Fruit',
              color: '#A30035',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Boysenberry',
                  color: '#EDA4A6',
                  labelColor: '#A30035',
                  enabled: true
                },
                {
                  name: 'Black Currant',
                  color: '#EDA4A6',
                  labelColor: '#A30035',
                  enabled: true
                },
                {
                  name: 'Black Cherry',
                  color: '#EDA4A6',
                  labelColor: '#A30035',
                  enabled: true
                },
                {
                  name: 'Plum',
                  color: '#EDA4A6',
                  labelColor: '#A30035',
                  enabled: true
                },
                {
                  name: 'Blackberry',
                  color: '#EDA4A6',
                  labelColor: '#A30035',
                  enabled: true
                },
                {
                  name: 'Blueberry',
                  color: '#EDA4A6',
                  labelColor: '#A30035',
                  enabled: true
                },
                {
                  name: 'Olive',
                  color: '#EDA4A6',
                  labelColor: '#A30035',
                  enabled: true
                }
              ]
            }, {
              name: 'Dried Fruit',
              color: '#D15992',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Roisin',
                  color: '#F1BCD2',
                  labelColor: '#D15992',
                  enabled: true
                },
                {
                  name: 'Fig',
                  color: '#F1BCD2',
                  labelColor: '#D15992',
                  enabled: true
                },
                {
                  name: 'Date',
                  color: '#F1BCD2',
                  labelColor: '#D15992',
                  enabled: true
                },
                {
                  name: 'Fruitcoke',
                  color: '#F1BCD2',
                  labelColor: '#D15992',
                  enabled: true
                },
              ]
            }, {
              name: 'Noble Rot',
              color: '#0096DC',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Beeswax',
                  color: '#B0D1EF',
                  labelColor: '#0096DC',
                  enabled: true
                },
                {
                  name: 'Ginger',
                  color: '#B0D1EF',
                  labelColor: '#0096DC',
                  enabled: true
                },
                {
                  name: 'Saffran',
                  color: '#B0D1EF',
                  labelColor: '#0096DC',
                  enabled: true
                }
              ]
            }, {
              name: 'Spice',
              color: '#00BDAD',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'White Pepper',
                  color: '#BCE7E5',
                  labelColor: '#00BDAD',
                  enabled: true
                },
                {
                  name: 'Red Pepper',
                  color: '#BCE7E5',
                  labelColor: '#00BDAD',
                  enabled: true
                },
                {
                  name: 'Black Pepper',
                  color: '#BCE7E5',
                  labelColor: '#00BDAD',
                  enabled: true
                },
                {
                  name: 'Cinnamon',
                  color: '#BCE7E5',
                  labelColor: '#00BDAD',
                  enabled: true
                },
                {
                  name: 'Anise',
                  color: '#BCE7E5',
                  labelColor: '#00BDAD',
                  enabled: true
                },
                {
                  name: 'Asian 5-Spice',
                  color: '#BCE7E5',
                  labelColor: '#00BDAD',
                  enabled: true
                },
                {
                  name: 'Fennel',
                  color: '#BCE7E5',
                  labelColor: '#00BDAD',
                  enabled: true
                },
                {
                  name: 'Eucalyptus',
                  color: '#BCE7E5',
                  labelColor: '#00BDAD',
                  enabled: true
                },
                {
                  name: 'Mint',
                  color: '#BCE7E5',
                  labelColor: '#00BDAD',
                  enabled: true
                },
                {
                  name: 'Thyme',
                  color: '#BCE7E5',
                  labelColor: '#00BDAD',
                  enabled: true
                }
              ]
            }, {
              name: 'Vegetable',
              color: '#00973F',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Grass',
                  color: '#C5E6C1',
                  labelColor: '#00973F',
                  enabled: true
                },
                {
                  name: 'Tomato Leaf',
                  color: '#C5E6C1',
                  labelColor: '#00973F',
                  enabled: true
                },
                {
                  name: 'Gooseberry',
                  color: '#C5E6C1',
                  labelColor: '#00973F',
                  enabled: true
                },
                {
                  name: 'Bell Pepper',
                  color: '#C5E6C1',
                  labelColor: '#00973F',
                  enabled: true
                },
                {
                  name: 'Jalapeno',
                  color: '#C5E6C1',
                  labelColor: '#00973F',
                  enabled: true
                },
                {
                  name: 'Green Almond',
                  color: '#C5E6C1',
                  labelColor: '#00973F',
                  enabled: true
                },
                {
                  name: 'Tomato',
                  color: '#C5E6C1',
                  labelColor: '#00973F',
                  enabled: true
                },
                {
                  name: 'Sun Dried Tomato',
                  color: '#C5E6C1',
                  labelColor: '#00973F',
                  enabled: true
                },
                {
                  name: 'Black Tea',
                  color: '#C5E6C1',
                  labelColor: '#00973F',
                  enabled: true
                }
              ]
            }, {
              name: 'Earth',
              color: '#69AA2C',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Clay Pot',
                  color: '#D3ECB5',
                  labelColor: '#69AA2C',
                  enabled: true
                },
                {
                  name: 'Slate',
                  color: '#D3ECB5',
                  labelColor: '#69AA2C',
                  enabled: true
                },
                {
                  name: 'Wet Gravel',
                  color: '#D3ECB5',
                  labelColor: '#69AA2C',
                  enabled: true
                },
                {
                  name: 'Potting Soil',
                  color: '#D3ECB5',
                  labelColor: '#69AA2C',
                  enabled: true
                },
                {
                  name: 'Red Beet',
                  color: '#D3ECB5',
                  labelColor: '#69AA2C',
                  enabled: true
                },
                {
                  name: 'Volcanic Rocks',
                  color: '#D3ECB5',
                  labelColor: '#69AA2C',
                  enabled: true
                },
                {
                  name: 'Petroleum',
                  color: '#D3ECB5',
                  labelColor: '#69AA2C',
                  enabled: true
                }
              ]
            }, {
              name: 'Microbial',
              color: '#BCBF00',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Butter',
                  color: '#ECEEA9',
                  labelColor: '#BCBF00',
                  enabled: true
                },
                {
                  name: 'Cream',
                  color: '#ECEEA9',
                  labelColor: '#BCBF00',
                  enabled: true
                },
                {
                  name: 'Sourdough',
                  color: '#ECEEA9',
                  labelColor: '#BCBF00',
                  enabled: true
                },
                {
                  name: 'Lager',
                  color: '#ECEEA9',
                  labelColor: '#BCBF00',
                  enabled: true
                },
                {
                  name: 'Truffle',
                  color: '#ECEEA9',
                  labelColor: '#BCBF00',
                  enabled: true
                },
                {
                  name: 'Mushroom',
                  color: '#ECEEA9',
                  labelColor: '#BCBF00',
                  enabled: true
                }
              ]
            }, {
              name: 'Oak Aging',
              color: '#C69100',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Vanilla',
                  color: '#EBD19C',
                  labelColor: '#C69100',
                  enable: true
                },
                {
                  name: 'Coconut',
                  color: '#EBD19C',
                  labelColor: '#C69100',
                  enable: true
                },
                {
                  name: 'Baking Spices',
                  color: '#EBD19C',
                  labelColor: '#C69100',
                  enable: true
                },
                {
                  name: 'Cigar Box',
                  color: '#EBD19C',
                  labelColor: '#C69100',
                  enable: true
                },
                {
                  name: 'Smoke',
                  color: '#EBD19C',
                  labelColor: '#C69100',
                  enable: true
                },
                {
                  name: 'Dill',
                  color: '#EBD19C',
                  labelColor: '#C69100',
                  enable: true
                }
              ]
            }, {
              name: 'General Aging',
              color: '#E98314',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Dried Fruit',
                  color: '#FECB9E',
                  labelColor: '#E98314',
                  enable: true
                },
                {
                  name: 'Nuts',
                  color: '#FECB9E',
                  labelColor: '#E98314',
                  enable: true
                },
                {
                  name: 'Tabacco',
                  color: '#FECB9E',
                  labelColor: '#E98314',
                  enable: true
                },
                {
                  name: 'Coffee',
                  color: '#FECB9E',
                  labelColor: '#E98314',
                  enable: true
                },
                {
                  name: 'Cocoa',
                  color: '#FECB9E',
                  labelColor: '#E98314',
                  enable: true
                },
                {
                  name: 'Leather',
                  color: '#FECB9E',
                  labelColor: '#E98314',
                  enable: true
                }
              ]
            }, {
              name: 'TCA',
              color: '#C88272',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Wet Dog',
                  color: '#EDC8BE',
                  labelColor: '#C88272',
                  enable: true
                },
                {
                  name: 'Musty Cordboard',
                  color: '#EDC8BE',
                  labelColor: '#C88272',
                  enable: true
                }
              ]
            }, {
              name: 'Sulfide & Mercaptan',
              color: '#D6673F',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Cured Meat',
                  color: '#F4BEA1',
                  labelColor: '#D6673F',
                  enable: true
                },
                {
                  name: 'Boiled Eggs',
                  color: '#F4BEA1',
                  labelColor: '#D6673F',
                  enable: true
                },
                {
                  name: 'Burnt Rubber',
                  color: '#F4BEA1',
                  labelColor: '#D6673F',
                  enable: true
                },
                {
                  name: 'Match Box',
                  color: '#F4BEA1',
                  labelColor: '#D6673F',
                  enable: true
                },
                {
                  name: 'Garlic',
                  color: '#F4BEA1',
                  labelColor: '#D6673F',
                  enable: true
                },
                {
                  name: 'Onion',
                  color: '#F4BEA1',
                  labelColor: '#D6673F',
                  enable: true
                },
                {
                  name: 'Cat Pee',
                  color: '#F4BEA1',
                  labelColor: '#D6673F',
                  enable: true
                }
              ]
            }, {
              name: 'Brett',
              color: '#C24347',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Block Cardamon',
                  color: '#EEB1A8',
                  labelColor: '#C24347',
                  enable: true
                },
                {
                  name: 'Band-Aid',
                  color: '#EEB1A8',
                  labelColor: '#C24347',
                  enable: true
                },
                {
                  name: 'Sweaty Leather Saddle',
                  color: '#EEB1A8',
                  labelColor: '#C24347',
                  enable: true
                },
                {
                  name: 'House Manure',
                  color: '#EEB1A8',
                  labelColor: '#C24347',
                  enable: true
                }
              ]
            }, {
              name: 'Cook',
              color: '#C71B74',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Stewed Fruit',
                  color: '#EAA8BE',
                  labelColor: '#C71B74',
                  enable: true
                },
                {
                  name: 'Toffee',
                  color: '#EAA8BE',
                  labelColor: '#C71B74',
                  enable: true
                }
              ]
            }, {
              name: 'V.A.',
              color: '#AB43A2',
              labelType: LabelTypes.along,
              children: [
                {
                  name: 'Balsamic',
                  color: '#DBAFD4',
                  labelColor: '#AB43A2',
                  enable: true
                },
                {
                  name: 'Vinegar',
                  color: '#DBAFD4',
                  labelColor: '#AB43A2',
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
