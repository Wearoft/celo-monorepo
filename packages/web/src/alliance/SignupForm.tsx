import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import FormContainer, { emailIsValid, hasField } from 'src/forms/Form'
import { CheckboxWithLabel, Form, LabeledInput } from 'src/forms/FormComponents'
import { NameSpaces, useTranslation } from 'src/i18n'
import Button, { BTN } from 'src/shared/Button.3'
import { standardStyles } from 'src/styles'

const BLANK_FORM = {
  name: '',
  email: '',
  contribution: '',
  subscribe: false,
}

function validateWith(fields: Record<keyof typeof BLANK_FORM, string>) {
  return Object.keys(fields).filter((key) => {
    if (key === 'email') {
      return !emailIsValid(fields[key])
    } else if (key === 'subscribe' || key === 'contribution') {
      return false
    } else {
      return !hasField(fields[key])
    }
  })
}
{
  /* <ErrorMessage allErrors={formState.errors} field={'name'} t={t} /> */
}

export default function SignupForm() {
  const { t } = useTranslation(NameSpaces.alliance)
  return (
    <FormContainer route="/api/alliance" blankForm={BLANK_FORM} validateWith={validateWith}>
      {({ formState, onInput, onCheck, onAltSubmit }) => (
        <Form>
          <View style={{ margin: 20 }}>
            <View style={standardStyles.row}>
              <View style={styles.inputContainer}>
                <LabeledInput
                  isDarkMode={true}
                  label={t('form.name')}
                  onInput={onInput}
                  hasError={formState.errors.includes('name')}
                  name="name"
                  value={formState.form.name as string}
                />
              </View>
              <View style={styles.inputContainer}>
                <LabeledInput
                  isDarkMode={true}
                  label={t('form.email')}
                  onInput={onInput}
                  hasError={formState.errors.includes('email')}
                  name="email"
                  value={formState.form.email as string}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <LabeledInput
                isDarkMode={true}
                label={t('form.contribution')}
                onInput={onInput}
                hasError={formState.errors.includes('contribution')}
                name="contribution"
                value={formState.form.contribution as string}
              />
            </View>
            <View style={styles.inputContainer}>
              <CheckboxWithLabel
                name={'subscribe'}
                checked={!!formState.form.subscribe}
                onPress={onCheck}
                label={t('form.subscribe')}
              />
            </View>
          </View>
          <View style={standardStyles.centered}>
            <Button
              text={t('form.btn')}
              onDarkBackground={true}
              onPress={onAltSubmit}
              kind={BTN.PRIMARY}
            />
          </View>
        </Form>
      )}
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
})
