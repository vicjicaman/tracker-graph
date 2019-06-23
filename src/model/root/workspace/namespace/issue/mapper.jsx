export const operation = ({
  parent: {
    issueid,
    namespace: {
      workspace: {
        workspaceid
      }
    }
  }
}) => ({
  workspaceid,
  issueid
})
