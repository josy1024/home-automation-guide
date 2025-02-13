# abstract

* devide "sensor.op1_energy_smooth" in 2 different energy sensors (op1_energy_smooth_drying, op1_energy_smooth_washing)  based on washing machine state

 
## input: sensors and states
* sensor.op1_energy_smooth [kwh]
* washer state check: 'sensor.waschi_aktueller_status', 'drying'

## helper: previus input numbers
* input_number.previous_op1_energy_smooth [kwh]
* input_number.previous_op1_energy_smooth_drying [kwh]

## template: sensor.op1_energy_smooth_drying [kwh]
```yaml
{% set current_energy = states('sensor.op1_energy_Smooth') | float %}
{% set previous_energy = states('input_number.previous_op1_energy_smooth') | float %}
{% set incremental_energy = current_energy - previous_energy %}

{% set op1_energy_smooth_drying = states('input_number.previous_op1_energy_smooth_drying') %}

{% if is_state('sensor.waschi_aktueller_status', 'drying') and incremental_energy > 0 %}
    {{ op1_energy_smooth_drying + incremental_energy }}
{% else %}
    {{ op1_energy_smooth_drying }}
{% endif %}
```

## template: sensor.op1_energy_smooth_washing [kwh]
```yaml
{% set total_energy = states('sensor.op1_energy_Smooth') | float %}
{% set drying_energy = states('sensor.op1_energy_smooth_drying') | float %}
{{ total_energy - drying_energy }}
```

## automations:
```yaml

alias: Update previous_op1_energy_smooth
description: ""
triggers:
  - entity_id: sensor.op1_energy_Smooth
    trigger: state
actions:
  - data:
      entity_id: input_number.previous_op1_energy_smooth
      value: "{{ states('sensor.op1_energy_Smooth') | float }}"
    action: input_number.set_value


alias: Update previous_op1_energy_smooth_drying
description: ""
triggers:
  - trigger: state
    entity_id:
      - sensor.op1_energy_smooth_drying
    to: null
conditions:
  - condition: not
    conditions:
      - condition: state
        entity_id: sensor.op1_energy_smooth_drying
        state: unavailable
actions:
  - action: input_number.set_value
    metadata: {}
    data:
      value: "{{ states('sensor.op1_energy_smooth_drying') }}"
    target:
      entity_id: input_number.previous_op1_energy_smooth_drying
mode: single


```
