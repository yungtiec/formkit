import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FormActions from "../../components/form-builder/FormActions";
import * as FieldListActions from "../../store/form/actions";
import FIELD_OPTION_CONFIG from "../../constants/fieldOptionConfig";
import _ from 'lodash'

function mapStateToProps(state) {
  return {
    fieldList: _.values(FIELD_OPTION_CONFIG),
    schema: state.form.schema,
  };
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {...FieldListActions};
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormActions);
