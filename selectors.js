import { createSelector } from 'reselect'

export const currentCartogramSelector = createSelector(
  state => state.pluginConfigs.cartograms,
  state => state.plugins.cartograms.enabledCartogramIndex,

  (config, enabledCartogramIndex) => config.items[enabledCartogramIndex] || null
)
