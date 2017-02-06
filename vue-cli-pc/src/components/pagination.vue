<template>
  <div class="pagination">
    <div>共<span>{{totalCount}}</span>条，{{pageSize}}条/页
    </div>
    <div class="btn-num">
      <a :class="{disabled:pagination.pageIndex==0}"
         @click.prevent="pagination.pageIndex=pagination.pageIndex==0?0:pagination.pageIndex-1" href="#">
        &lt;</a>
      <a :class="{active:pagination.pageIndex==0}" @click.prevent="pagination.pageIndex=0" href="#">1</a>
      <a v-if="pagination.pageIndex >= 5" @click.prevent="pagination.pageIndex=pageNumArr[0]-1" href=""
         class="dot3">...</a>
      <a :class="{active:pagination.pageIndex==num}" v-for="num in pageNumArr"
         @click.prevent="pagination.pageIndex=num" href="#">{{num+1}}</a>
      <a v-if="totalPage > 6&&pageNumArr[pageNumArr.length-1] < totalPage-2" class="dot3"
         @click.prevent="pagination.pageIndex=pageNumArr[pageNumArr.length-1]+1" href="">...</a>
      <a v-if="totalPage>1" :class="{active:pagination.pageIndex==totalPage-1}"
         @click.prevent="pagination.pageIndex=totalPage-1"
         href="#">{{totalPage}}</a>
      <a :class="{disabled:pagination.pageIndex>=totalPage-1}"
         @click.prevent="pagination.pageIndex=pagination.pageIndex==totalPage-1?totalPage-1:pagination.pageIndex+1"
         href="#">
        &gt;</a>
    </div>

    <div>
      去
      <input type="number" v-model.number="goToPage">页 <a href="javascript:void(0)"
                                                          @click="pagination.pageIndex=(goToPage>0&&goToPage<=totalPage)?goToPage-1:pagination.pageIndex">跳转</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'pagination',
    props: ['pagination'],
    data () {
      return {
//        pageIndex: this.pagination.pagination.pageIndex,
        goToPage: this.$parent.search || null,
      }
    },
    computed: {
      pageSize: function () {
        return this.$parent.pagination.pageSize;
      },
      totalCount: function () {
        return this.$parent.pagination.totalCount;
      },
//      pagination.pageIndex:function () {
//        return this.$parent.pagination.pageNo-1;
//      },

      pageNumArr: function () {
        var numArr = [],
          pageIndex = this.pagination.pageIndex;
        // 生成5的整数倍+1开始的长度为5的,包含当前页码的数组 如：pagination.pageIndex=6:[5，6,7,8,9],pagination.pageIndex=14:[10，11,12,13,14]
        for (var i = Math.floor((pageIndex ) / 5) * 5; i < Math.floor((pageIndex ) / 5) * 5 + 5; i++) {
          //第一页和最后一页已写死
          if (i == 0 || i >= this.totalPage - 1) {
            continue;
          }
          numArr.push(i);
        }
        return numArr;
      },
      totalPage: function () {
        return Math.ceil(this.totalCount / this.pageSize);
      },


    },
    created(){

    },
    watch: {
      pagination: {
        deep: true,
        handler: function (i) {
          this.$parent.search();
        }
      }
    }

  }
</script>

<style scoped>
  /*@import "../assets/css/component-sidebar.scss";*/
  .pagination {
    display: flex;
    align-items: center;
    color: #8d929a;
    font-size: 12px;
    justify-content: flex-end;
  }

  input {
    color: inherit;
    text-align: center;
    background-color: #fff;
    border-radius: 0;
    width: 40px;
    height: 26px;
    border: 1px solid #e3e8ef;
    margin-left: 5px;
    margin-right: 5px;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  .btn-num {
    display: flex;
  }

  .btn-num .dot3 {
    background: transparent;
    border: 0;
    position: relative;
    bottom: 0.25em;
    padding: 0;
    min-width: 20px;

  }

  .btn-num a {
    margin-left: 10px;
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 26px;
    height: 26px;
    color: #8d929a;
    border: 1px solid #EAEAEA;
    background-color: #ffffff;
  }

  .btn-num a.active {
    color: #00d4d3;
    background-color: #fff;
    border-color: #00d4d3;
  }

  .btn-num a:not(.disabled):hover {
    background-color: #fff;
  }

  .btn-num a:first-child, .btn-num a:last-child {
    background-color: #f7f7f7;
  }

  .disabled {
    cursor: not-allowed;
  }

  .pagination > div:last-child {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  .pagination > div:last-child a {
    display: block;
    height: 26px;
    line-height: 26px;
    width: 50px;
    text-align: center;
    color: #8d929a;
    border: 1px solid #EAEAEA;
    background-color: #f7f7f7;
    margin-left: 10px;
  }

  .pagination > div:last-child a:hover {
    background-color: #fff;

  }

</style>



