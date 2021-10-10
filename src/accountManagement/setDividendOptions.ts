import urlBuilder from '../utils/urlBuilder'
import request from '../utils/requestAgent'
import log from '../utils/promiseLogger'
import { Config, DividendOption } from "../types"
import getDividendOptions from './getDividendOptions'
import { fromCode as dividendOptionCodeToDividendOptionName } from '../utils/dividendOptionMap'

export default (config: Config) => (dividendOptions: DividendOption[]): Promise<DividendOption[]> =>
  request(urlBuilder(config).generateSD('sddividendinstructions'))
    .then(log('Got dividend options'))
    .then(({ body: { $ } }) => request(urlBuilder(config).generateSD('sddividendinstructionsverify'))
      .type('form')
      .send({
        ...formDataFrom(dividendOptions),
        HxUniqueID: $('input[name="HxUniqueID"]').val()
      }))
    .then(log('Set dividend options'))
    .then(getDividendOptions(config))

const formDataFrom = (dividendOptions: DividendOption[]) =>
  dividendOptions.reduce<Record<string, string>>((formData, { accountId, dividendOptionCode, dividendOptionName }: DividendOption) => {
    if (!Object.keys(dividendOptionCodeToDividendOptionName).includes(dividendOptionCode)) {
      throw new Error(`Invalid dividend option code '${dividendOptionCode}'`)
    }

    if (dividendOptionName && dividendOptionCodeToDividendOptionName[dividendOptionCode] !== dividendOptionName) {
      throw new Error(`Dividend option name '${dividendOptionName}' and dividend option code '${dividendOptionCode}' do not match`)
    }

    if (Object.prototype.hasOwnProperty.call(formData, 'radio' + accountId)) {
      throw new Error(`Form data already contains input for accountId '${accountId}'. Potential duplicate in the input`)
    }

    formData['radio' + accountId] = dividendOptionCode
    return formData
  }, {})
