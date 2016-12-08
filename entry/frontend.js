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
  form: {
    fields: [
      {
        key: 'items',
        label: 'Картограммы',
        input: 'array',
        item: {
          fields: [
            { key: 'name', label: 'Название', input: 'string' },
            { key: 'layer', label: 'Слой', input: 'select', inputOptions: { options: 'layers' } },
            {
              key: 'property',
              label: 'Поле (только с типом Number)',
              input: 'select',
              inputOptions: { options: buildFieldsOptions }
            },
            {
              key: 'colorStops',
              label: 'Цветовая схема',
              input: 'array',
              item: {
                fields: [
                  { key: 'value', label: 'Значение', input: 'number' },
                  { key: 'color', label: 'Цвет (формат: "#ffffff")', input: 'string' }
                ]
              }
            }
          ]
        }
      }
    ]
  },
  components: [
    { component: Legend, position: 'mapCustom' },
    { component: Menu, position: 'mapCustom' }
  ],
  saga,
  reducer
}
