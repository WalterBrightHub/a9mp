<script>
  export default {

    onLaunch: function() {
      console.log(process.env.NODE_ENV)
    }
  }
</script>

<style lang="scss">
  page {
    background-color: $page-bg-color;

    display: flex;
    flex-direction: column;

    font-size: 14px;
    color: $text-p-color;


    @media (prefers-color-scheme: dark) {
      background-color: $page-bg-color-dark;
      color: $text-p-color-dark;
    }
  }
</style>
