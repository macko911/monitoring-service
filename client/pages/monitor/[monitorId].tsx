import {withRouter} from 'next/router'
import {compose} from 'redux'
import {connect} from 'react-redux'

import {getMonitor} from '../../store/selectors'
import {State} from '../../store/reducers'

import {MonitorDetailPage} from '../../components'

const mapStateToProps = (state: State, {router}) => ({
  detail: getMonitor(state, router.query.monitorId),
  isNew: router.query.monitorId === 'new',
})

export default compose(
  withRouter,
  connect(mapStateToProps),
)(MonitorDetailPage)
