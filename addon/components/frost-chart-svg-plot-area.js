/**
 * Component definition for the frost-chart-svg-plot-scatter component
 */

import Ember from 'ember'
const {A, get} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-chart-svg-plot-area'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  tagName: 'g',

  // == PropTypes =============================================================

  propTypes: {
    // options
    area: PropTypes.func.isRequired,
    chartState: PropTypes.EmberObject.isRequired,
    data: PropTypes.array.isRequired,
    x: PropTypes.string.isRequired,
    y: PropTypes.string.isRequired

    // state
  },

  getDefaultProps () {
    return {
      // options
      css: this.get('class') || this.getComponentName()

      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('boundingData.[]', 'data.[]', 'chartState.range.x', 'chartState.range.y', 'chartState.domain.x',
    'chartState.domain.y')
  _path (boundingData, data, xRange, yRange, xDomain, yDomain) {
    if (!xRange || !yRange || !xDomain || !yDomain) {
      return []
    }

    const xScale = this.get('chartState.scale.x')
    const xTransform = xScale({domain: xDomain, range: xRange})

    const yScale = this.get('chartState.scale.y')
    const yTransform = yScale({domain: yDomain, range: yRange})

    const points = A(data.map(entry => {
      return {
        x: xTransform(get(entry, this.x)),
        y: yTransform(get(entry, this.y))
      }
    })).sortBy('x', 'y')

    return this.area({boundingData, points, xRange, xTransform, yRange, yTransform})
  }

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})
