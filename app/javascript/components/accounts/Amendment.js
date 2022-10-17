              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="budget_version"
                  name="budget_version"
                  label="Budget Version"
                  onChange={handleInputChange}
                  value={account.budget_version || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <NumericFormat
                  id="number_of_patients"
                  name="number_of_patients"
                  variant="outlined"
                  label="Number of Patients"
                  customInput={TextField}
                  type="text"
                  onChange={handleNumberInputChange}
                  value={account.number_of_patients || ''}
                  size="small"
                  fullWidth
                  thousandSeparator=","
                />
              </Grid>
              {/* <Grid item xs={6}> Using Pikaday
                <TextField
                  type="text"
                  id="cta_date"
                  name="cta_date"
                  label="CTA Date (yyyy-mm-dd)"
                  ref={dateInput}
                  autoComplete="off"
                  value={account.cta_date || ''}
                  onChange={handleInputChange}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid> */}
              <Grid item xs={6}>
                <DatePicker
                  type="text"
                  id="cta_date"
                  name="cta_date"
                  label="CTA Date"
                  inputFormat="yyyy-MM-dd"
                  onChange={handleDateInputChange}
                  value={account.cta_date}
                  renderInput={
                    (params) => <TextField size="small" fullWidth {...params} />
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  id="notes"
                  name="notes"
                  label="Notes"
                  onChange={handleInputChange}
                  value={account.notes || ''}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
