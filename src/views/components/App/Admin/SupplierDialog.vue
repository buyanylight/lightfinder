<template>
  <div>
    <v-dialog :value="dialog" @input="$emit('update:dialog', false)" scrollable :persistent=true max-width="50%">
      <v-card>
        <v-toolbar height="49px" dark color="grey darken-4">
          <h1 v-if="is_new" class="font-weight-light title">Add </h1>
          <h1 v-else class="font-weight-light title">Edit </h1>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs color="yellow darken-4" dark>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab dark href="#mobile-tabs-5-1" class="primary--text">
            <span>Account Information</span>
          </v-tab>
          <v-tab href="#mobile-tabs-5-2" class="primary--text">
            Supplier Categories
          </v-tab>
          <v-tab-item :value="'mobile-tabs-5-1' ">
            <v-card flat>
              <!-- form -->
              <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
                <v-layout row wrap mt-4>
                  <v-flex xs6>
                    <v-flex xs9 offset-xs1>
                      <v-layout row wrap>
                        <v-flex xs6 pr-1>
                          <v-text-field color="black" v-model="form.first_name" :error-messages="fieldErrors('form.first_name')" @blur="$v.form.first_name.$touch()" label="First Name" required></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                          <v-text-field v-model="form.last_name" :error-messages="fieldErrors('form.last_name')" @blur="$v.form.last_name.$touch()" color="black" label="Last Name" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs9 offset-xs1>
                      <v-text-field v-model="form.owner_name" :error-messages="fieldErrors('form.owner_name')" @blur="$v.form.owner_name.$touch()" color="black" label="Owner Name" required></v-text-field>
                    </v-flex>
                    <v-flex xs9 offset-xs1>
                      <v-text-field v-model="form.email" :error-messages="fieldErrors('form.email')" @blur="$v.form.email.$touch()" color="black" label="Email" required></v-text-field>
                    </v-flex>
                    <v-flex v-if="is_new" xs10 offset-xs1>
                      <v-text-field v-model="form.password" :append-icon="showPassword ? 'visibility' : 'visibility_off'" :type="showPassword ? 'text' : 'password'" name="input-10-2" :error-messages="fieldErrors('form.password')" @blur="$v.form.password.$touch()" label="Password" hint="At least 8 characters" @click:append="showPassword = !showPassword"></v-text-field>
                    </v-flex>
                    <v-flex xs9 offset-xs1>
                      <v-layout row wrap>
                        <v-flex xs6 pr-1>
                          <v-text-field v-model="form.phone" :error-messages="fieldErrors('form.phone')" @blur="$v.form.phone.$touch()" color="black" label="Telephone Number" required></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                          <v-text-field v-model="form.fax" :error-messages="fieldErrors('form.fax')" @blur="$v.form.fax.$touch()" color="black" label="Fax" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs9 offset-xs1>
                      <v-text-field color="black" v-model="form.address" :error-messages="fieldErrors('form.address')" @blur="$v.form.address.$touch()" label="Address" required></v-text-field>
                    </v-flex>
                    <v-flex xs9 offset-xs1>
                      <v-select color="black" v-model="form.country_id" :items="countries" :search-input.sync="search" cache-items item-text="name" item-value="id" :error-messages="fieldErrors('form.country_id')" @blur="$v.form.country_id.$touch()" label="Country" data-vv-name="Country" required></v-select>
                    </v-flex>
                    <v-flex xs9 offset-xs1>
                      <v-layout row wrap>
                        <v-flex xs6 pr-1>
                          <v-text-field v-model="form.job_title" :error-messages="fieldErrors('form.job_title')" @blur="$v.form.job_title.$touch()" color="black" label="Job Title" required></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                          <v-text-field color="black" v-model="form.no_employee" :error-messages="fieldErrors('form.no_employee')" @blur="$v.form.no_employee.$touch()" label="No. of Employee" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-flex>
                  <v-flex xs6>
                    <v-flex xs11>
                      <v-text-field color="black" v-model="form.brand_name" :error-messages="fieldErrors('form.brand_name')" @blur="$v.form.brand_name.$touch()" label="Brand Name" required></v-text-field>
                    </v-flex>
                    <v-flex xs11>
                      <v-text-field color="black" v-model="form.factory_name" :error-messages="fieldErrors('form.factory_name')" @blur="$v.form.factory_name.$touch()" label="Factory Name" required></v-text-field>
                    </v-flex>
                    <v-flex xs11>
                      <v-textarea color="black" v-model="form.company_description" :error-messages="fieldErrors('form.company_description')" @blur="$v.form.company_description.$touch()" name="input-7-4" label="Company Description" value=""></v-textarea>
                    </v-flex>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey darken-4" dark @click="submit()" :loading="formloading">
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-form>
              <!-- form -->
            </v-card>
          </v-tab-item>
          <v-tab-item :value="'mobile-tabs-5-2' ">
            <v-card flat height="529px">
              <v-layout row wrap pa-2>
                <v-autocomplete v-model="categories" :items="categoryItems" item-text="name" item-value="id" ref="categorySelect" cache-items chips multiple hide-no-data clearable hide-details label="select categories..">
                  <template v-slot:selection="slotData">
                    <v-chip :selected="slotData.selected" close class="chip--select-multi" @input="removeFromCategories(slotData.item)">
                      {{ slotData.item.name }}
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-layout>
            </v-card>
            <v-divider></v-divider>
         <!--    <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey darken-4" dark @click="addCategories()" :loading="formloading">
                Submit
              </v-btn>
            </v-card-actions> -->
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import adminSupplierBus from "@/bus/admin-supplier";
import { required, email, maxLength } from 'vuelidate/lib/validators'
// import helpers from "@/mixins/helpers"
import validationMixin from '@/mixins/validationMixin'


const dform = {

  brand_name: '',
  factory_name: '',
  address: '',
  country_id: '',
  no_employee: '',
  company_description: '',
  owner_firstname: '',
  owner_lastname: '',
  owner_name: '',
  job_title: '',
  phone: '',
  fax: '',
  password: '',

}

export default {

  mixins: [ 
    validationMixin,
    // helpers,
  ],

  validations: {

    form: {

      brand_name: { required },
      factory_name: { required },
      address: { required },
      country_id: { required },
      no_employee: { required },
      company_description: { required },
      first_name: { required },
      last_name: { required },
      owner_name: { required },
      job_title: { required },
      phone: { required },
      fax: { required },
      email: { required, email },
      password: { required }

    }

  },

  validationMessages: {

    form: {

      brand_name: { required: 'Brand Name is Required' },
      factory_name: { required: 'Factory nane is Required' },
      address: { required: 'Address is Required' },
      country_id: { required: 'Country is Required' },
      no_employee: { required: 'No. of Employee is Required' },
      company_description: { required: 'Company Description is Required' },
      first_name: { required: 'Owner First Name is Required' },
      last_name: { required: 'Owner Last Name is Required' },
      owner_name: { required: 'Owner is Required' },
      job_title: { required: 'Job Title is Required' },
      phone: { required: 'Telephone is Required' },
      fax: { required: ' Fax is Required' },
      email: { required: 'Email is Required', email: 'Email is Invalid' },

    }
  },

  data() {

    return {

      form: {

        brand_name: '',
        factory_name: '',
        address: '',
        country_id: '',
        no_employee: '',
        company_description: '',
        owner_firstname: '',
        owner_lastname: '',
        owner_name: '',
        job_title: '',
        phone: '',
        fax: '',
        password: '',

      },

      countries: [],
      search: null,
      formloading: false,
      showPassword: false,
      categories: [],
      categoryItems: [],

    }

  },

  props: [

    'dialog',
    'supplier_id',
    'is_new',
    'supplierData',
    'supplierCategories'

  ],


  watch: {

    supplierData: {

      handler(nval, oval) {
        this.fillForm();
      }

    },

    supplierCategories: {

      handler(nVal, oVal) {

        this.categories = Object.keys(this.supplierCategories).map((k) => this.supplierCategories[k])

      }

    }




  },

  created: function() {

    /*
      get countries
    */

    this.getCountries()
    .then((response) => {
        this.countries = response
    })
    .catch((e) => {
        console.log('Error: ')
        console.log(e);
    });


    // get categories for category select box
    this.$store.dispatch('cat/getCategories_a')
      .then((data) => {
        this.categoryItems = data;
      })
      .catch((e) => {
        console.log('Error: ');
        console.log(e);
      });



  },

  methods: {


    fillForm() {

      this.form.email = this.supplierData.email
      this.form.password = this.supplierData.password
      this.form.first_name = this.supplierData.first_name
      this.form.last_name = this.supplierData.last_name
      this.form.job_title = this.supplierData.job_title
      this.form.phone = this.supplierData.phone
      this.form.fax = this.supplierData.fax
      this.form.address = this.supplierData.address
      this.form.country_id = this.supplierData.country_id
      this.form.brand_name = this.supplierData.brand_name
      this.form.factory_name = this.supplierData.factory_name
      this.form.company_description = this.supplierData.company_description
      this.form.owner_name = this.supplierData.owner_name
      this.form.no_employee = this.supplierData.no_of_employees

    },

    closeDialog() {

      this.$emit('update:dialog', false);
      this.$emit('update:is_new', false);
      this.$emit('update:supplier_id', null);
      this.categories = [];
      this.resetForm();
    },

    resetForm() {

      this.form = Object.assign({}, dform)
      this.$refs.form.reset();
      this.$v.$reset()

    },

    submit() {

      // console.log(this.form);
      if (this.is_new) {
        this.addSupplier();
      } else {
        this.editSupplier();
      }

      if(this.categories.length)
      this.addCategories();



      this.closeDialog();

    },


    addCategories() {

      let data = {
        'categories':this.categories,
        'id':this.supplier_id
      }

      this.$store.dispatch('admnSpplr/addSupplierCat_a', {
          data: data
        })
        .then((response) => {

          this.formloading = false
          // this.$emit('update:dialog', false);
          // adminSupplierBus.emitFormSubmitted()

        })
        .catch((e) => {
          console.log(e);
          this.formloading = false
        })
        .finally(() => {
          this.formloading = false
        })

    },


    removeFromCategories(item) {
      const index = this.categories.indexOf(item.id);
      if (index >= 0)
        this.categories.splice(index, 1)
 
    },

    addSupplier() {


      this.formloading = true

      let data = {

        'email': this.form.email,
        'password': this.form.password,
        'first_name': this.form.first_name,
        'last_name': this.form.last_name,
        'job_title': this.form.job_title,
        'phone': this.form.phone,
        'fax': this.form.fax,
        'address': this.form.address,
        'country_id': this.form.country_id,
        'brand_name': this.form.brand_name,
        'factory_name': this.form.factory_name,
        'company_description': this.form.company_description,
        'owner_name': this.form.owner_name,
        'no_of_employees': this.form.no_employee

      }

      this.$store.dispatch('admnSpplr/addSupplier_a', {
          data: data
        })
        .then((response) => {

          this.formloading = false

          this.$emit('update:dialog', false);
          adminSupplierBus.emitFormSubmitted()

        })
        .catch((e) => {
          console.log(e);
          this.formloading = false
        })
        .finally(() => {
          this.formloading = false
        })


    },


    editSupplier() {

      this.formloading = true

      let data = {

        'email': this.form.email,
        'password': this.form.password,
        'first_name': this.form.first_name,
        'last_name': this.form.last_name,
        'job_title': this.form.job_title,
        'phone': this.form.phone,
        'fax': this.form.fax,
        'address': this.form.address,
        'country_id': this.form.country_id,
        'brand_name': this.form.brand_name,
        'factory_name': this.form.factory_name,
        'company_description': this.form.company_description,
        'owner_name': this.form.owner_name,
        'no_of_employees': this.form.no_employee,
        'id': this.supplier_id

      }


      this.$store.dispatch('admnSpplr/updateSUpplier_a', {

          data: data

        })
        .then((response) => {

          this.formloading = false

          this.$emit('update:dialog', false);
          adminSupplierBus.emitFormSubmitted()

        })
        .catch((e) => {
          console.log(e);
          this.formloading = false
        })
        .finally(() => {
          this.formloading = false
        })


    },


  }
}

</script>
