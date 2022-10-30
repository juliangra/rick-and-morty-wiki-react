import { useReactiveVar } from '@apollo/client'
import { Drawer, Select, Button, Grid } from '@mantine/core'
import { IconFilter, IconFilterOff } from '@tabler/icons'
import { FILTER_SPECIES, FILTER_GENDERS, FILTER_STATUS } from 'src/constants/filter'
import useFilterForm from 'src/hooks/forms/useFilterForm'
import { filterDrawerIsOpenVar } from 'src/state/dashboard'

const FilterDrawer = () => {
  const open = useReactiveVar(filterDrawerIsOpenVar)
  const { form, handleOnSubmit } = useFilterForm()

  return (
    <Drawer
      opened={open}
      onClose={() => filterDrawerIsOpenVar(false)}
      title="Filter characters"
      padding="xl"
      size="xl"
    >
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))} data-cy="filter-form">
        <Select
          label="Species"
          searchable
          placeholder="Pick a species"
          clearable
          allowDeselect
          data={FILTER_SPECIES}
          data-cy="species-select"
          {...form.getInputProps('species')}
        />
        <Select
          label="Gender"
          searchable
          placeholder="Pick a gender"
          clearable
          allowDeselect
          data={FILTER_GENDERS}
          {...form.getInputProps('gender')}
        />
        <Select
          label="Status"
          searchable
          placeholder="Pick a status"
          clearable
          allowDeselect
          data={FILTER_STATUS}
          {...form.getInputProps('status')}
        />
        <Grid mt={10}>
          <Grid.Col span={6}>
            <Button
              variant="outline"
              color="red"
              onClick={() => handleOnSubmit()}
              fullWidth
              leftIcon={<IconFilterOff size={16} />}
            >
              Reset
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button type="submit" fullWidth leftIcon={<IconFilter size={16} />}>
              Filter
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Drawer>
  )
}

export default FilterDrawer
