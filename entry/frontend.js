import R from 'ramda'

import Legend from '../components/legend/Legend'
import Menu from '../components/menu/Menu'
import saga from '../saga'
import reducer from '../reducer'

function buildFieldsOptions(formOptions) {
  const { directories: { layers }, values, fieldPath } = formOptions
  const cartogramPath = [fieldPath[0], fieldPath[1], 'layer']
  const layerKey = R.path(cartogramPath, values)
  if (R.isNil(layerKey)) return []

  const layer = R.find(x => x.key === layerKey, layers)
  const attributes = layer && R.pickBy(value => value.type === 'Number', layer.attributes)
  return R.keys(attributes).map(key => ({ value: key, label: attributes[key].label }))
}

export default {
  name: 'Картограммы',
  options: [
    {
      key: 'items',
      label: 'Картограммы',
      type: 'array',
      item: {
        fields: [
          { key: 'name', label: 'Название', type: 'string' },
          { key: 'layer', label: 'Слой', type: 'select', options: 'layers' },
          { key: 'property', label: 'Поле (только с типом Number)', type: 'select', options: buildFieldsOptions },
          {
            key: 'colorStops',
            label: 'Цветовая схема',
            type: 'array',
            item: {
              fields: [
                { key: 'value', label: 'Значение', type: 'number' },
                { key: 'color', label: 'Цвет (формат: "#ffffff")', type: 'string' }
              ]
            }
          }
        ]
      }
    }
  ],
  connects: {
    components: [
      { component: Legend, position: 'mapCustom' },
      { component: Menu, position: 'mapCustom' }
    ],
    saga,
    reducer
  }
}
