<template>
  <v-navigation-drawer
    class="pb-0 vuse-sidebar google-material"
    :class="[navDrawerAlphaMod ? 'alpha' : '', navDrawerScheme, navDrawerVariant ? 'google-material-effect' : '']"
    persistent
    fixed
    width="260"
    :mini-variant.sync="navMiniVarient"
    :clipped="clipped"
    v-model="drawer"
    :left="navDrawerPosition === 'left'"
    :right="navDrawerPosition === 'right'"
    enable-resize-watcher
    floating
    id="app-drawer"
    app>




    <!-- Drawer Toolbar -->
    <v-toolbar flat class="text-xs-center z-index-2">
      <v-list>
        <v-list-tile>

          <v-list-tile-avatar v-if="navMiniVarient">            
            <img src="/static/logos/liliwaters-logo-square-white.png" id="nav_logo_square" :title="title">
          </v-list-tile-avatar>
          
          <v-list-tile-content>
            <img src="/static/logos/liliwaters-logo-white.png" id="nav_logo" :title="title">
            <!-- <v-list-tile-title class="headline">Lili Waters</v-list-tile-title> -->
          </v-list-tile-content>

          <!-- <v-list-tile-content>
            <img src="/static/logos/liliwaters-logo-white.png" id="nav_logo">
          </v-list-tile-content> -->

        </v-list-tile>
      </v-list>
    </v-toolbar>
























    


    <!-- Drawer Items -->
    <v-list
      dense="dense"
      expand="expand"
      class="nav-drawer"
      id="app-sidebar"
    >





      <template v-for="(item, i) in items">



        <!--group with subitems-->
        <v-list-group
          v-if="item.items"
          :group="item.group"
          :prepend-icon="item.icon"
          no-action
          :key="`${i}-item`"
          active-class="act-menu">

          <v-list-tile slot="activator" ripple>
            <v-list-tile-content>s
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <template v-for="(subItem, i) in item.items">
            <!--sub group-->
            <v-list-group v-if="subItem.items" :group="subItem.group" sub-group :key="`${i}-subitems`">
              <v-list-tile slot="activator" ripple class="list__tile-inner-group">
                <v-list-tile-action v-if="subItem.icon">
                  <v-icon>{{ subItem.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-action v-else>
                  <v-avatar size="28">
                    <span>{{ subItem.title | first2Char }}</span>
                  </v-avatar>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="(grand, i) in subItem.items" :key="i" :to="genChildTarget(item, grand)" :href="grand.href" ripple>
                <v-list-tile-action v-if="grand.icon">
                  <v-icon>{{ grand.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-action v-else>
                  <v-avatar size="28">
                    <span>{{ grand.title | first2Char }}</span>
                  </v-avatar>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>

            <!--child item-->
            <v-list-tile v-else :key="i" :to="genChildTarget(item, subItem)" :href="subItem.href" :disabled="subItem.disabled" :target="subItem.target" ripple>
              <v-list-tile-action>
                <v-icon v-if="subItem.prependIcon">{{ subItem.prependIcon }}</v-icon>
                <v-avatar size="28" v-else>
                  <span>{{ subItem.title | first2Char }}</span>
                </v-avatar>
              </v-list-tile-action>
              <v-list-tile-content class="">
                <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>
              </v-list-tile-content>
              <v-chip v-if="subItem.badge" color="primary" disabled class="white--text pa-0 chip--x-small">{{ subItem.badge }}</v-chip>
              <v-list-tile-action v-if="subItem.action">
                <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list-group>





        <!-- single items -->
        <v-list-tile
          v-else :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          ripple
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="`${i}-item`"
          class="list__tile-solo">
          
          <v-list-tile-action>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            <v-avatar size="28" v-else>
              <span>{{ item.title | first2Char }}</span>
            </v-avatar>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>



      </template>


      <v-spacer class="mb-5"></v-spacer>




        <v-list-tile>
        <v-layout align-end justify-end fill-height/>
            <v-btn icon light class="hidden-md-and-down" @click.stop="toggleMiniVariantMode">
                <v-tooltip bottom v-if="navMiniVarient" color="sidebar">
                    <v-icon slot="activator">fas fa-arrow-circle-right</v-icon>
                    <span>Expand</span>
                </v-tooltip>
                <v-tooltip bottom v-else color="sidebar">
                    <v-icon slot="activator">fas fa-arrow-circle-left</v-icon>
                    <span>Collapse</span>
                </v-tooltip>
            </v-btn>
        </v-layout>
        </v-list-tile>


        <!-- <v-list-tile>
        <v-layout align-end justify-end fill-height/>
            <v-btn icon light class="hidden-md-and-down" @click="logout">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-layout>
        </v-list-tile> -->

    </v-list>




  </v-navigation-drawer>
</template>






























<script>
    import {
        mapGetters
    } from 'vuex'
    import appDrawerItems from '@/data/app-drawer-items'
    import {
        camel
    } from '@/utils/helpers'

    export default {
        data() {
            return {
                items: appDrawerItems,
                dark: false,
                title: 'Lili Waters',
            }
        },
        mounted() {
            // const ps = document.getElementById('app-drawer')
            // ps.addEventListener('mouseenter', this.miniEnterVariantHandler)
            // ps.addEventListener('mouseleave', this.miniLeaveVariantHandler)
        },
        beforeDestroy() {

            // disable mouseover expand
            // const ps = document.getElementById('app-drawer')
            // if (ps) {
            //     ps.removeEventListener('mouseenter', this.miniEnterVariantHandler)
            //     ps.removeEventListener('mouseleave', this.miniVariantHandler)
            // }
        },
        computed: {
            ...mapGetters({
                clipped: 'navClipped',
                navDrawer: 'navDrawer',
                navMiniVarient: 'navMiniVarient',
                navDrawerPosition: 'navDrawerPosition',
                navDrawerScheme: 'navDrawerScheme',
                navDrawerAlphaMod: 'navDrawerAlphaMod',
                navDrawerAlphaImg: 'navDrawerAlphaImg',
                navDrawerVariant: 'navDrawerVariant',
                fixedFooter: 'fixedFooter',
                showFooter: 'showFooter',
                miniview: 'miniview'
            }),
            activemenu() {
                return this.$vuetify.theme.activemenu
            },
            drawer: {
                get() {
                    return this.navDrawer
                },
                set(value) {
                    this.$store.dispatch('toggleDrawer', value)
                }
            }
        },
        methods: {

            toggleMiniVariantMode () {
                this.$store.dispatch('toggleMiniVariantMode')
                this.$store.dispatch('toggleMiniVarient')
            },

            miniEnterVariantHandler() {
                // if it's tab or small devive then it won't listen this event
                if (this.miniview && this.navMiniVarient === true && this.$vuetify.breakpoint.mdAndDown === false) {
                    this.$store.dispatch('toggleMiniVarient', false)
                    // const container = document.querySelector('#app-sidebar')
                    // container.scrollTop = 0
                }
            },
            miniLeaveVariantHandler() {
                // if it's tab or small devive then it won't listen this event
                if (this.miniview && this.navMiniVarient === false && this.$vuetify.breakpoint.mdAndDown === false) {
                    this.$store.dispatch('toggleMiniVarient', true)
                    // const container = document.querySelector('#app-sidebar')
                    // container.scrollTop = 0
                }
            },
            genChildTarget(item, subItem) {
                if (subItem.href) return
                if (item.component) {
                    return {
                        name: item.component,
                        params: {
                            section: item.group,
                            component: subItem.name
                        }
                    }
                }
                // console.log(`Sidebar:`)
                // console.log({ name: `${item.group}/${camel(subItem.name)}` })
                return {
                    name: `${item.group}/${camel(subItem.name)}`
                }
            },

            logout() {
                this.$router.push({name:'Logout'});                
            },

        }
    }
</script>








<style scoped lang="stylus">
  // .no-overflow
  //   overflow: hidden
  #app-drawer
    img.logo
      margin 40px 0 15px

    .chip--x-small
      font-size: 10px
      height: 16px

      .chip__content
        line-height: 1
        padding: 8px

    .diamond-sponsor
      // todo trim down actual image file dimensions
      height: 35px
      margin-bottom 0.25em

      aside.navigation-drawer ul li
        font-size 14px
        color: #373737

      &-label
        color #676767
        margin: 24px 0 16px 0
        font-size 13px

    #nav_logo
      width: 100%
</style>
