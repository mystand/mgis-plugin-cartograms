import { createSelector } from 'reselect'

export const currentCartogramSelector = createSelector(
  state => state.pluginConfigs.cartograms,
  state => state.plugins.cartograms.enabledCartogramIndex,

  // todo добавить значения по умолчанию и убрать "|| []"
  (config, enabledCartogramIndex) => (config.items || [])[enabledCartogramIndex] || null
)
